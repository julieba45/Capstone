from flask import Blueprint, jsonify, session, request
from app.models import Order, Plant, OrderPlant
from app.models import User, db
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

order_routes = Blueprint("order", __name__)

@order_routes.route('/checkout', methods=["PUT"])
@login_required
def checkout():
    """
    Checks out the user's cart, turning it into an order
    """
    current_user_id = current_user.get_id()
    orderId = session.get('orderId')

    #update order w/current user's ID
    order = Order.query.get(orderId)
    if order is None:
        return jsonify({'error': 'Order not found'}), 404
    else:
        order.userId =  current_user_id
        order.isCheckedOut= True
        db.session.commit()
        session.pop('orderId', None)
        return jsonify(order.to_dict())
