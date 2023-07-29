import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewforPlant } from '../../store/review';
import StarRatings from 'react-star-ratings';

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
        <form onSubmit={handleReviewSubmit}>
            Description
                <textarea
                    value = {reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
            Rating
                <StarRatings
                    rating={rating}
                    starRatedColor="gray"
                    starHoverColor="red"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name='rating'
                />
                <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.5"
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                />
                <button type="submit">Submit Review</button>
                {error && <p>{error}</p>}
            </form>
    )
}
export default ReviewModal;
