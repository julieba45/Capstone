import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlant } from '../../store/plant';
import { addToCart } from '../../store/cart';
import { useParams } from 'react-router-dom';
import { createReviewforPlant, getAllPlantReviews } from '../../store/review';
import { useModal } from '../../context/Modal';
import DeletePlantReviewModal from '../DeletePlantReviewModal';
import ReviewModal from '../ReviewModal';


const PlantDetails = () => {
    const dispatch = useDispatch();
    const { plantId } = useParams();
    const plant = useSelector(state => state.plants.currentPlant);
    const reviews = useSelector(state => state.reviews)
    const currentUser = useSelector(state => state.session.user);
    const [quantity, setQuantity] = useState(1);
    const {setModalContent} = useModal();
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getPlant(plantId));
        dispatch(getAllPlantReviews(plantId))
    }, [dispatch, plantId])

    const handleAddToCart = () => {
        dispatch(addToCart(plant, quantity));
    }

    const openDeleteModal = (reviewId) => {
        setModalContent(<DeletePlantReviewModal reviewId={reviewId}/>)
    }

    const openReviewModal = () => {
        setModalContent(<ReviewModal plantId={plantId} closeModal={closeModal}/>)
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
                    {currentUser && currentUser.id === review.userId && (
                         <button onClick={() => openDeleteModal(review.id)}>Delete Review</button>
                    )}
                </div>
            ))}
            </div>
            {currentUser && <button onClick={openReviewModal}>Create a Review</button>
            }
        </div>
    )
}

export default PlantDetails;
