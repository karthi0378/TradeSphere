from flask import Blueprint
from ..services.stock_service import get_quote

stocks_bp = Blueprint("stocks", __name__)


@stocks_bp.get("/quote/<symbol>")
def quote(symbol):
    try:
        return get_quote(symbol)

    except ValueError as exc:
        return {"error": str(exc)}, 400

    except Exception as exc:
        return {
            "error": "Unable to retrieve stock data",
            "details": str(exc)
        }, 502