from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    gardenName = db.Column(db.String(50))
    plantId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('plants.id')), nullable=False)
    position = db.Column(db.Integer)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='favorites')
    plant = db.relationship('Plant', back_populates='favorites')

    def to_dict(self):
        return {
            "id":self.id,
            "userId": self.userId,
            "gardenName": self.gardenName,
            "position": self.position,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
