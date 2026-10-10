from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models.wallet import Wallet
from ..models.holding import Holding
from ..models.transaction import Transaction
from ..services.stock_service import get_quote

trading_bp = Blueprint("trading", __name__)

def _trade(action):
    user_id = int(get_jwt_identity())
    data = request.get_json(silent=True) or {}
    symbol = str(data.get("symbol", "")).strip().upper()

    try:
        quantity = float(data.get("quantity", 0))
    except (TypeError, ValueError):
        quantity = 0

    if not symbol or quantity <= 0:
        return {"error": "symbol and positive quantity are required"}, 400

    try:
        quote = get_quote(symbol)
        price = float(quote["price"])
    except Exception as exc:
        return {"error": f"Unable to get price: {exc}"}, 400

    total = round(price * quantity, 2)
    wallet = Wallet.query.filter_by(user_id=user_id).first()
    holding = Holding.query.filter_by(user_id=user_id, symbol=symbol).first()

    if action == "BUY":
        if wallet.balance < total:
            return {"error": "insufficient wallet balance"}, 400

        wallet.balance = round(wallet.balance - total, 2)

        if holding:
            old_value = holding.quantity * holding.average_price
            new_quantity = holding.quantity + quantity
            holding.average_price = round((old_value + total) / new_quantity, 4)
            holding.quantity = new_quantity
        else:
            holding = Holding(
                user_id=user_id,
                symbol=symbol,
                quantity=quantity,
                average_price=price
            )
            db.session.add(holding)

    else:
        if not holding or holding.quantity < quantity:
            return {"error": "insufficient shares"}, 400

        holding.quantity = round(holding.quantity - quantity, 8)
        wallet.balance = round(wallet.balance + total, 2)

        if holding.quantity <= 0.00000001:
            db.session.delete(holding)

    transaction = Transaction(
        user_id=user_id,
        symbol=symbol,
        transaction_type=action,
        quantity=quantity,
        price=price,
        total=total
    )
    db.session.add(transaction)
    db.session.commit()

    return {
        "message": f"{action.lower()} order completed",
        "transaction": {
            "id": transaction.id,
            "symbol": symbol,
            "type": action,
            "quantity": quantity,
            "price": price,
            "total": total
        },
        "wallet_balance": wallet.balance
    }

@trading_bp.post("/buy")
@jwt_required()
def buy():
    return _trade("BUY")

@trading_bp.post("/sell")
@jwt_required()
def sell():
    return _trade("SELL")

@trading_bp.get("/wallet")
@jwt_required()
def wallet():
    user_id = int(get_jwt_identity())
    wallet = Wallet.query.filter_by(user_id=user_id).first()
    return {"balance": wallet.balance if wallet else 0}
