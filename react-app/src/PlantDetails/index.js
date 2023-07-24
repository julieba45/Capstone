import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlant } from '../store/plant';
import { addToCart } from '../store/cart';
import { useParams } from 'react-router-dom';

const PlantDetails = () => {
    const dispatch = useDispatch();
    const { plantId } = useParams();
    const plant = useSelector(state => state.plants.currentPlant);

    useEffect(() => {
        dispatch(getPlant(plantId));
    }, [dispatch, plantId])

    const handleAddToCart = () => {
        dispatch(addToCart(plant));
    }

    return (
        <div>
            <h1>Plant Detail</h1>
            <h2>{plant.name}</h2>
            <p>{plant.description}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}

export default PlantDetails;
