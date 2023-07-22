from flask import Blueprint, jsonify, session, request
from app.models import Favorite, Plant, db
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

favorite_routes = Blueprint("favorite", __name__)

@favorite_routes.route('/current', methods=['GET'])
@login_required
def get_current_favorites():
    """
    Get all current user's favorites
    """
    current_user_id = current_user.get_id()
    favorites = Favorite.query.filter_by(userId=current_user_id).all()
    return jsonify([favorite.to_dict() for favorite in favorites])

@favorite_routes.route('/<string:gardenName>', methods=['GET'])
@login_required
def get_garden_details(gardenName):
    """
    Get all favorites in a specific garden for the current user
    """
    current_user_id = current_user.get_id()
    favorites = Favorite.query.filter_by(userId=current_user_id, gardenName=gardenName).all()
    return jsonify([favorite.to_dict() for favorite in favorites])

@favorite_routes.route('', methods=['POST'])
@login_required
def add_plant_to_favorites():
    """
    Add a plant to the user's favorites
    """
    data = request.get_json()
    plantId = data.get('plantId')
    gardenName = data.get('gardenName', None)

    plant = Plant.query.get(plantId)
    if plant is None:
        return jsonify({'error': 'Plant not found'}), 404

    favorite = Favorite(
        userId=current_user.id,
        plantId=plantId,
        gardenName=gardenName
    )
    db.session.add(favorite)
    db.session.commit()
    return jsonify(favorite.to_dict())

@favorite_routes.route('/<int:favoriteId>', methods=['PUT'])
def update_favorite(favoriteId):
    """
    Update a favorite for the current user
    """
    data = request.get_json()
    favorite = Favorite.query.get(favoriteId)
    if favorite is None:
        return jsonify({'error': 'Favorite plant not found'}), 404
    if favorite.userId != current_user.id:
        return jsonify({'error': 'Unauthorized, to edit this favorite plant'}), 403

    # favorite.gardenName = data.get('gardenName': favorite.gardenName)
    ##NEED TO FINISH THIS ROUTE
