import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { cancelPayment } from "../../store/payment";
import { fetchOrders } from "../../store/order";

function CancelPaymentModal({paymentId}){
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleCancel = async() => {
        const result  = await dispatch(cancelPayment(paymentId))
        if(result.ok){
            dispatch(fetchOrders())
            closeModal()
        }
    }

    return (
        <div>
            <h2>Are you sure you want to cancel this payment?</h2>
            <button onClick={handleCancel}>Yes, Cancel!</button>
            <button onClick={closeModal}>No, Keep it.</button>
        </div>
    )
}

export default CancelPaymentModal;
