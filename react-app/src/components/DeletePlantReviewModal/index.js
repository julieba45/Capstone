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
        <div>
            <h2 >Are you sure you want to delete this task</h2>
            <button onClick={handleDelete}>Yes, Delete!</button>
            <button onClick={closeModal}>No, Keep it.</button>
            {error && <p>{error}</p>}
        </div>
    )

}

export default DeletePlantReviewModal;
