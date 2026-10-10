from ..extensions import db

class Holding(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    symbol = db.Column(db.String(30), nullable=False)
    quantity = db.Column(db.Float, nullable=False, default=0)
    average_price = db.Column(db.Float, nullable=False, default=0)

    user = db.relationship("User", back_populates="holdings")

    __table_args__ = (
        db.UniqueConstraint("user_id", "symbol", name="uq_user_symbol"),
    )
