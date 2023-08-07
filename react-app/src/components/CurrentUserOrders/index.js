import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/order";
import { useModal } from "../../context/Modal";
import CancelPaymentModal from "../CancelPaymentModal";
import "./CurrentUserOrders.css"

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
        <div className="orders-container">
            <h1 className="orderhistory-title">Order History</h1>
            {orders.sort((a,b) => b.id - a.id).map(order => (
                <React.Fragment key={order.id}>
                <p className="order-placed"> Order placed: {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="order-grid" key={order.id}>
                    <div className="order-top-half">
                        <h3>Order No. {order.id}</h3>
                        {/* <p>{order.userFirstName}</p> */}

                        <p className="order-status">Status: {order.status}</p>
                        {/* <p>'HEYY'{order.payment.id}</p> */}
                        {order.payment && <p>Payment: $ {order.payment.paymentAmount}</p>}
                    </div>
                    <div className="order-bottom-half">
                        <h4 className="products-bought-title">Products:</h4>
                        {order.orderPlants.map(orderPlant => (
                            <div className="order-plants-info"key={orderPlant.id}>
                            <p>Plant Name: {orderPlant.plant.name}</p>
                            <p>Plant Quantity: {orderPlant.quantity}</p>
                            <p>Plant watering frequency: {orderPlant.plant.wateringFrequency}</p>
                            </div>
                        ))}
                    </div>
                     {order.status !== 'Cancelled' && (
                        <button  className="cancel-btn-orders" onClick={() => openCancelModal(order.payment.id)}>
                            Cancel Payment
                        </button>
                    )}
                </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default CurrentUserOrders
