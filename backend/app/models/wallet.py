from ..extensions import db

class Wallet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), unique=True, nullable=False)
    balance = db.Column(db.Float, nullable=False, default=100000.0)

    user = db.relationship("User", back_populates="wallet")
