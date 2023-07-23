from flask import Blueprint, jsonify, session, request
from app.models import Order,User, db
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

order_routes = Blueprint("order", __name__)


@order_routes.route('/current', methods=['GET'])
@login_required
def get_current_orders():
    """
    Query for all the orders of the current user and returns them in a list of dictionaries
    """
    current_user_id = current_user.get_id()
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({'error': 'User not found'}), 404
    else:
        orders = [order.to_dict() for order in user.orders]
        return jsonify(orders)
