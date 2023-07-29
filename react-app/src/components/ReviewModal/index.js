import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewforPlant } from '../../store/review';

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

    return (
        <form onSubmit={handleReviewSubmit}>
            Description
                <textarea
                    value = {reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
            Rating
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <button type="submit">Submit Review</button>
                {error && <p>{error}</p>}
            </form>
    )
}
export default ReviewModal;
