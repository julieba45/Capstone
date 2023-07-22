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

    payment = Payment(orderId=orderId, paymentAmount=payment_amount, userId=current_user_id, location=location)
    db.session.add(payment)
    order.isCheckedOut= True
    session.pop('orderId', None)
    db.session.commit()

    return jsonify(payment.to_dict_full())
