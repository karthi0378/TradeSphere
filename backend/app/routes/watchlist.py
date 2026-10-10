from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models.watchlist import Watchlist

watchlist_bp = Blueprint("watchlist", __name__)

@watchlist_bp.get("")
@jwt_required()
def get_watchlist():
    user_id = int(get_jwt_identity())
    items = Watchlist.query.filter_by(user_id=user_id).all()
    return {"watchlist": [x.symbol for x in items]}

@watchlist_bp.post("")
@jwt_required()
def add_watchlist():
    user_id = int(get_jwt_identity())
    data = request.get_json(silent=True) or {}
    symbol = str(data.get("symbol", "")).strip().upper()

    if not symbol:
        return {"error": "symbol is required"}, 400

    if Watchlist.query.filter_by(user_id=user_id, symbol=symbol).first():
        return {"message": "symbol already in watchlist"}

    db.session.add(Watchlist(user_id=user_id, symbol=symbol))
    db.session.commit()
    return {"message": "added to watchlist", "symbol": symbol}, 201

@watchlist_bp.delete("/<symbol>")
@jwt_required()
def remove_watchlist(symbol):
    user_id = int(get_jwt_identity())
    symbol = symbol.strip().upper()
    item = Watchlist.query.filter_by(user_id=user_id, symbol=symbol).first()

    if not item:
        return {"error": "symbol not found in watchlist"}, 404

    db.session.delete(item)
    db.session.commit()
    return {"message": "removed from watchlist", "symbol": symbol}
