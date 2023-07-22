from flask import Blueprint, jsonify, session, request
from app.models import Order, Plant, OrderPlant
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


@cart_routes.route('', methods=['POST'])
def add_plant_to_cart():
    """
    Add a plant to the user's cart
    """
    data = request.get_json()
    plantId = data.get('plantId')
    quantity = data.get('quantity', 1) #default to 1 for user friendliness

    plant = Plant.query.get(plantId)
    if plant is None:
        return jsonify({'error': 'Plant not found'}), 404

    #Grabbing the orderId from session (if the user is not logged in)
    #Creating an order
    orderId = session.get('orderId')
    if orderId is None:
        order = Order(isCheckedOut=False)
        db.session.add(order)
        db.session.commit()
        session['orderId'] = order.id
    else:
        order = Order.query.get(orderId)

    #checking if the plant is already in the cart
    #Adding to the OrderPlants table, adding the plant if it's not already in the OrderPlants
    order_plant = OrderPlant.query.filter_by(orderId=order.id, plantId=plantId).first()

    if order_plant is None:
        order_plant = OrderPlant(orderId=order.id, plantId=plantId, quantity=quantity)
        db.session.add(order_plant)
    else:
        order_plant.quantity += quantity

    db.session.commit()
    return jsonify(order.to_dict())
