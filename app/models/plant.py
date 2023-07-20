from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Plant(db.Model):
    __tablename__ = 'plants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String, nullable=False)
    description = db.Column(db.String(500))
    careInstructions = db.Column(db.Text)
    wateringFrequency = db.Column(db.Integer)
    isInBloom = db.Column(db.Boolean)
    price = db.Column(db.Float, nullable=False)
    size = db.Column(db.String(50))
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow)

    images = db.relationship('PlantImage', back_populates='plant', cascade="all, delete-orphan")
    order_plants = db.relationship('OrderPlant', back_populates='plant')
    reviews = db.relationship('Review', back_populates='plant')
    favorites = db.relationship('Favorite', back_populates='plant')
