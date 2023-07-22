from flask import Blueprint, jsonify, session, request
from app.models import Review, Order, OrderPlant, db
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user
from app.forms import ReviewForm

review_routes = Blueprint("review", __name__)

@review_routes.route('/<int:plantId>', methods=['POST'])
@login_required
def create_review(plantId):
    """
    Create a review for a specific plant
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #check if the user has bought that plant before
    order = Order.query.filter(Order.userId == current_user.id, Order.isCheckedOut == True).join(OrderPlant).filter(OrderPlant.plantId == plantId).first()
    if not order:
        return jsonify({'error': 'You must buy a plant before you can review it'}), 403

    if form.validate_on_submit():
        review = Review(
            reviewText=form.data['reviewText'],
            rating=form.data['rating'],
            plantId=plantId,
            userId=current_user.id
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
