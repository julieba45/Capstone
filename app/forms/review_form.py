from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from app.models import Review

class ReviewForm(FlaskForm):
    reviewText = StringField('reviewText', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    # plantId = IntegerField('PlantId', validators=[DataRequired()])
    # user_id = IntegerField('UserId', validators=[DataRequired()])
