import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/order";
import { cancelPayment } from "../../store/payment";

const CurrentUserOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);

    useEffect(() => {
        // console.log(orders, 'THE ORDERS OF THE CURRENT USER ')
        dispatch(fetchOrders())
    }, [dispatch]);

    const handleCancelPayment = async (paymentId) => {
        const result  = await dispatch(cancelPayment(paymentId))
        if(result.ok){
            dispatch(fetchOrders())
        }
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
                        <button onClick={() => handleCancelPayment(order.payment.id)}>
                            Cancel Payment
                        </button>
                    )}
                    <h4>Plants:</h4>
                    {order.orderPlants.map(orderPlant => (
                         <div key={orderPlant.id}>
                         <p>Plant Name: {orderPlant.plant.name}</p>
                         <p>Plant Quantity: {orderPlant.quantity}</p>
                     </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default CurrentUserOrders
