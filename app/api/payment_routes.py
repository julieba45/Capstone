from flask import Blueprint, jsonify, session, request
from app.models import Payment, Order, db
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

payment_routes = Blueprint("payment", __name__)

@payment_routes.route('', methods=['POST'])
@login_required
def add_payment():
    """
    Create a payment for an order after checkout
    """
    data = request.get_json()
    orderId = session.get('orderId')
    payment_info = data.get('paymentInfo')
    payment_amount = data.get('paymentAmount')
    location = data.get('location')
    current_user_id = current_user.get_id()

    order = Order.query.get(orderId)
    if order is None:
        return jsonify({'error':'Order not found'}), 404

    total_cost = sum(order_plant.plant.price * order_plant.quantity for order_plant in order.order_plants)

    if payment_amount != total_cost:
        return jsonify({'error': 'Payment amount does not match totalcost'}), 400
    order.userId =  current_user_id

    payment = Payment(orderId=orderId, paymentAmount=payment_amount, userId=current_user_id, location=location)
    db.session.add(payment)
    order.isCheckedOut= True
    order.status = "Completed"
    session.pop('orderId', None)
    db.session.commit()

    return jsonify(payment.to_dict_full())

@payment_routes.route('<int:paymentId>', methods=['DELETE'])
@login_required
def delete_payment(paymentId):
    """
    Cancel/Delete a payment
    """
    payment = Payment.query.get(paymentId)

    if payment is None:
        return jsonify({'error': 'Payment not found'}), 404
     #check current user is the owner of the payment
    if payment.userId != current_user.id:
        return jsonify({'error': 'Unauthorized to cancel this payment'}), 403
    order = payment.order
    order.status = 'Cancelled'

    db.session.delete(payment)
    db.session.commit()
    return jsonify({'message': 'Payment cancelled successfully'}), 200
