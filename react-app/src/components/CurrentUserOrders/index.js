import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/order";
import { useModal } from "../../context/Modal";
import CancelPaymentModal from "../CancelPaymentModal";

const CurrentUserOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);
    const {setModalContent} = useModal();

    useEffect(() => {
        // console.log(orders, 'THE ORDERS OF THE CURRENT USER ')
        dispatch(fetchOrders())
    }, [dispatch]);

    const openCancelModal = (paymentId) => {
        setModalContent(<CancelPaymentModal paymentId={paymentId}/>)
    }

    return(
        <div>
            {orders.map(order => (
                <div key={order.id}>
                    <h3>Order ID: {order.id}</h3>
                    {order.payment && <p>Payment: $ {order.payment.paymentAmount}</p>}
                    <p>Status: {order.status}</p>
                    {/* <p>'HEYY'{order.payment.id}</p> */}
                    {order.status !== 'Cancelled' && (
                        <button onClick={() => openCancelModal(order.payment.id)}>
                            Cancel Payment
                        </button>
                    )}
                    <h4>Plants:</h4>
                    {order.orderPlants.map(orderPlant => (
                         <div key={orderPlant.id}>
                         <p>Plant Name: {orderPlant.plant.name}</p>
                         <p>Plant Quantity: {orderPlant.quantity}</p>
                         <p>Plant watering frequency: {orderPlant.plant.wateringFrequency}</p>
                     </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default CurrentUserOrders
