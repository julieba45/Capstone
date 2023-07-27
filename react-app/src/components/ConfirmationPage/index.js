import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getOrder } from "../../store/cart";


const ConfirmationPage = () => {
    const dispatch = useDispatch();
    const {orderId} = useParams();
    const order = useSelector(state => state.cart.order)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("---------ORDER AND ORDERID",order, orderId)
        dispatch(getOrder(orderId))
        .then(() => setLoading(false))
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [dispatch, orderId]);
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Thank you for your payment!</h1>
            <p>You order has been confirmed and will be processed soon.</p>
            <p>Order ID: {order.id}</p>
            <p>Order for: {order.userFirstName}</p>
            <p>Total Amount: {order.payment.paymentAmount}</p>
            <p>Order Status: {order.status}</p>


            <NavLink to='/'>Return to Home</NavLink>
        </div>
    )
}

export default ConfirmationPage;
