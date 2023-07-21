from flask import Blueprint, jsonify, session, request
from app.models import Plant, User
from app.models import User, db
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

plant_routes = Blueprint('plants', __name__)

@plant_routes.route('', methods=['GET'])
def get_plants():
    """
    Query for all plants and return them in a list of plant dictionaries
    """
    plants = Plant.query.all()
    return jsonify({'Plants': [plant.to_dict() for plant in plants]})


@plant_routes.route('/<int:plantId>', methods=['GET'])
def get_plant(plantId):
    """
    Query for a specific plant and returns the plant details
    """
    plant = Plant.query.get(plantId)
    if plant is None:
        return jsonify({'error: Plant not found'}), 404
    else:
        return jsonify(plant.to_dict())
