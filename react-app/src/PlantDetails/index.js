import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlant } from '../store/plant';
import { addToCart } from '../store/cart';
import { useParams } from 'react-router-dom';
import { createReviewforPlant } from '../store/review';


const PlantDetails = () => {
    const dispatch = useDispatch();
    const { plantId } = useParams();
    const plant = useSelector(state => state.plants.currentPlant);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] =useState(5);
    const [error, setError] = useState(null);


    useEffect(() => {
        dispatch(getPlant(plantId));
    }, [dispatch, plantId])

    const handleAddToCart = () => {
        dispatch(addToCart(plant));
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

    return (
        <div>
            <h1>Plant Detail</h1>
            {error && <p>{error}</p>}
            <h2>{plant.name}</h2>
            <p>{plant.description}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <form onSubmit={handleReviewSubmit}>
                <textarea value = {reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                />
                <input type="number" min="1" max="5" value={rating}
                onChange={(e) => setRating(e.target.value)}
                />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    )
}

export default PlantDetails;
