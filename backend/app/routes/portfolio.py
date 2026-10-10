from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.holding import Holding
from ..models.transaction import Transaction
from ..models.wallet import Wallet
from ..services.stock_service import get_quote

portfolio_bp = Blueprint("portfolio", __name__)

@portfolio_bp.get("/portfolio")
@jwt_required()
def portfolio():
    user_id = int(get_jwt_identity())
    holdings = Holding.query.filter_by(user_id=user_id).all()
    result = []
    total_value = 0.0
    total_cost = 0.0

    for h in holdings:
        try:
            current_price = get_quote(h.symbol)["price"]
        except Exception:
            current_price = h.average_price

        value = h.quantity * current_price
        cost = h.quantity * h.average_price
        pnl = value - cost

        total_value += value
        total_cost += cost

        result.append({
            "symbol": h.symbol,
            "quantity": h.quantity,
            "average_price": h.average_price,
            "current_price": current_price,
            "market_value": round(value, 2),
            "profit_loss": round(pnl, 2)
        })

    wallet = Wallet.query.filter_by(user_id=user_id).first()
    return {
        "wallet_balance": round(wallet.balance if wallet else 0, 2),
        "holdings": result,
        "total_market_value": round(total_value, 2),
        "total_invested": round(total_cost, 2),
        "total_profit_loss": round(total_value - total_cost, 2)
    }

@portfolio_bp.get("/transactions")
@jwt_required()
def transactions():
    user_id = int(get_jwt_identity())
    rows = (
        Transaction.query
        .filter_by(user_id=user_id)
        .order_by(Transaction.created_at.desc())
        .all()
    )

    return {
        "transactions": [
            {
                "id": x.id,
                "symbol": x.symbol,
                "type": x.transaction_type,
                "quantity": x.quantity,
                "price": x.price,
                "total": x.total,
                "created_at": x.created_at.isoformat() if x.created_at else None
            }
            for x in rows
        ]
    }
