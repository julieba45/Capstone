import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlant } from '../store/plant';
import { addToCart } from '../store/cart';
import { useParams } from 'react-router-dom';
import { createReviewforPlant, deleteReviewById, getAllPlantReviews } from '../store/review';


const PlantDetails = () => {
    const dispatch = useDispatch();
    const { plantId } = useParams();
    const plant = useSelector(state => state.plants.currentPlant);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] =useState(5);
    const [error, setError] = useState(null);
    const reviews = useSelector(state => state.reviews)
    const currentUser = useSelector(state => state.session.user);
    const [quantity, setQuantity] = useState(1);


    useEffect(() => {
        dispatch(getPlant(plantId));
        dispatch(getAllPlantReviews(plantId))
    }, [dispatch, plantId])

    const handleAddToCart = () => {
        dispatch(addToCart(plant, quantity));
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const error = await dispatch(createReviewforPlant(plantId, {reviewText, rating}))
        if(error){
            setError(error)
        } else {
            setError(null)
        }
    }

    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReviewById(reviewId))
    }

    return (
        <div>
            <h1>Plant Detail</h1>
            <h2>{plant.name}</h2>
            <p>{plant.description}</p>
            <label>Quantity</label>
            <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            ></input>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <div>
                <h1>All the reviews below:</h1>
            {reviews.map(review => (
                <div key={review.id}>
                    <p>{review.reviewText}</p>
                    <p>Rating: {review.rating}</p>
                    {currentUser.id === review.userId && (
                         <button onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
                    )}
                </div>
            ))}
            </div>
            <form onSubmit={handleReviewSubmit}>
                <textarea value = {reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                />
                <input type="number" min="1" max="5" value={rating}
                onChange={(e) => setRating(e.target.value)}
                />
                <button type="submit">Submit Review</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default PlantDetails;
