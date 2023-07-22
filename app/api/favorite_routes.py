from flask import Blueprint, jsonify, session, request
from app.models import Favorite, db
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
