from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class OrderPlant(db.Model):
    __tablename__ = 'order_plants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    orderId = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    plantId = db.Column(db.Integer, db.ForeignKey('plants.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
