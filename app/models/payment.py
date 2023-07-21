from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Payment(db.Model):
    __tablename__ = 'payments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    orderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), nullable=False)
    paymentAmount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='payments')
    order = db.relationship('Order', back_populates='payments')

    def to_dict(self):
        return{
            'paymentAmount': self.paymentAmount
        }
