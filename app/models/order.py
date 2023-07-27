from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    isCheckedOut = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50), default='pending')
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='orders')
    order_plants = db.relationship('OrderPlant', back_populates='order', cascade="all, delete-orphan")
    payments = db.relationship('Payment', back_populates='order')

    def to_dict(self):
        payment = self.payments[0] if self.payments else None
        # print('HEYYYYYYYYY---------', type(self.order_plants))
        return {
            'id': self.id,
            'userId': self.userId,
            'userFirstName': self.user.firstName if self.user else None,
            'isCheckedOut': self.isCheckedOut,
            'status': self.status,
            'orderPlants': [orderplants.to_dict() for orderplants in self.order_plants],
            'payment': payment.to_dict_full() if payment else None
        }
# 'payment': self.payments[0].to_dict() if self.payments else None
