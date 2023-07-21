from flask import Blueprint, jsonify, session, request
from app.models import Order, User
from app.models import User, db
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

cart_routes = Blueprint("cart", __name__)

@cart_routes.route('/<int:orderId>', methods=['GET'])
@login_required
def get_order(orderId):
    """
    Gets all details of a specific order/cart
    """
    order = Order.query.get(orderId)
    "check if order exists and belongs to the current user"
    if order is None or order.userId != current_user.id:
        return jsonify({'error': 'Order not found'}), 404
    else:
        return jsonify(order.to_dict())
