from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .extensions import db

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    from .routes.auth import auth_bp
    from .routes.stocks import stocks_bp
    from .routes.trading import trading_bp
    from .routes.portfolio import portfolio_bp
    from .routes.watchlist import watchlist_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(stocks_bp, url_prefix="/api/stocks")
    app.register_blueprint(trading_bp, url_prefix="/api/trading")
    app.register_blueprint(portfolio_bp, url_prefix="/api")
    app.register_blueprint(watchlist_bp, url_prefix="/api/watchlist")

    with app.app_context():
        from . import models
        db.create_all()

    @app.get("/")
    def home():
        return {
            "message": "Stock Trading API is running",
            "status": "success"
        }

    @app.get("/api/health")
    def health():
        return {"status": "healthy"}

    return app
