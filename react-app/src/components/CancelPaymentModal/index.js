import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { cancelPayment } from "../../store/payment";
import { fetchOrders } from "../../store/order";
import "./CancelPaymentModal.css"

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
        <div className="cancel-payment-modal">
            <h2>Are you sure you want to cancel this payment?</h2>
            <hr className="line-after-image" />
            <div className="buttons-container">
                <button className="cancel-btn-order"onClick={handleCancel}>Yes, Cancel!</button>
                <button className="cancel-btn-order"onClick={closeModal}>No, Keep it.</button>
            </div>
        </div>
    )
}

export default CancelPaymentModal;
