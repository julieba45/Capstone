import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReviewById } from "../../store/review";
import { useModal } from "../../context/Modal";

function DeletePlantReviewModal({reviewId}){
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [error, setError] = useState(null);

    const handleDelete = async(e) => {
        e.preventDefault();

        try{
            await dispatch(deleteReviewById(reviewId))
            closeModal()
        }catch(err){
            setError(err.message || 'An error occurred')
        }

    };
    return (
        <div className="cancel-payment-modal">
            <h2 >Are you sure you want to delete this review?</h2>
            <hr className="line-after-image"></hr>
            <button className="cancel-btn-order"onClick={handleDelete}>Yes, Delete!</button>
            <button className="cancel-btn-order"onClick={closeModal}>No, Keep it.</button>
            {error && <p>{error}</p>}
        </div>
    )

}

export default DeletePlantReviewModal;
