from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class PlantImage(db.Model):
    __tablename__ = 'plantimages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    plantId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('plants.id')), nullable=False)
    pictureURL = db.Column(db.Text, nullable=False)
    isPrimary = db.Column(db.Boolean)

    plant = db.relationship('Plant', back_populates='images')
