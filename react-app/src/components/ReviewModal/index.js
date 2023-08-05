import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewforPlant } from '../../store/review';
// import StarRatings from 'react-star-ratings';
import StarRating from './StarRating';
import "./ReviewModal.css";

const ReviewModal = ({plantId, closeModal}) => {
    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const [error, setError] = useState(null);

    const handleReviewSubmit = async(e) => {
        e.preventDefault();
        const error = await dispatch(createReviewforPlant(plantId, {reviewText, rating}))
        if(error){
            setError(error);
        } else {
            setError(null)
            closeModal()
        }
    }

    const changeRating = (newRating) => {
        setRating(newRating);
    }

    return (
        <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="review-title">
                <h1>Leave a review</h1>
            </div>
            <div className="review-content">
                <textarea
                    className='signup-inputarea'
                    value = {reviewText}
                    placeholder='Description'
                    onChange={(e) => setReviewText(e.target.value)}
                    maxLength="150"
                    required
                />
            <StarRating rating={rating} changeRating={changeRating} />
                <input
                    className='signup-inputarea'
                    placeholder='Rating'
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    required
                    onChange={(e) => setRating((e.target.value))}
                />
                <button className="review-main-button"type="submit">Submit Review</button>
                {error && <p>{error}</p>}
                </div>
            </form>
    )
}
export default ReviewModal;
