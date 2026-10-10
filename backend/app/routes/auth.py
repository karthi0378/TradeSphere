from flask import Blueprint, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from ..extensions import db
from ..models.user import User
from ..models.wallet import Wallet

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))

    if not name or not email or not password:
        return {"error": "name, email and password are required"}, 400
    if len(password) < 6:
        return {"error": "password must be at least 6 characters"}, 400
    if User.query.filter_by(email=email).first():
        return {"error": "email already registered"}, 409

    user = User(name=name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.flush()

    db.session.add(Wallet(user_id=user.id, balance=100000.0))
    db.session.commit()

    token = create_access_token(identity=str(user.id))
    return {
        "message": "Registration successful",
        "access_token": token,
        "user": {"id": user.id, "name": user.name, "email": user.email}
    }, 201

@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return {"error": "invalid email or password"}, 401

    token = create_access_token(identity=str(user.id))
    return {
        "message": "Login successful",
        "access_token": token,
        "user": {"id": user.id, "name": user.name, "email": user.email}
    }

@auth_bp.get("/me")
@jwt_required()
def me():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return {"error": "user not found"}, 404

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }
