import React, {useContext, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getOrder } from "../../store/cart";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import "./ConfirmationPage.css"


const ConfirmationPage = () => {
    const dispatch = useDispatch();
    const {orderId} = useParams();
    const order = useSelector(state => state.cart.order)

    const [loading, setLoading] = useState(true);
    const [mapData, setMapData] = useState(null);


    useEffect(() => {
        // console.log("---------ORDER AND ORDERID",order, orderId)
        if (!order) {
            dispatch(getOrder(orderId))
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
        } else if (order.payment) {
            setLoading(false);
            fetchMapData(order.payment.location);
            console.log('hi')
        }
    }, [dispatch, orderId, order]);

    const fetchMapData = async (location) => {
        try {
            const response = await fetch(`/api/auth/map/${location}`);
            const data = await response.json();
            setMapData(data);
        } catch (err) {
            console.error(err);
        }
    };


    if (loading || !mapData) {
        return <div>Loading...</div>
    }


    const mapStyles = {
        height: "50vh",
        width: "100%"};

    const defaultCenter = {
        lat: mapData.results[0].geometry.location.lat, lng: mapData.results[0].geometry.location.lng
    }

    const calculatedDeliveryDate = (location) => {
        let deliveryDays;
        if(location.includes('USA') || location.includes("United States")){
            deliveryDays = 3
        }else {
            deliveryDays = 14
        }

        const delIveryDate = new Date();
        delIveryDate.setDate(delIveryDate.getDate() + deliveryDays);

        return delIveryDate
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
      };

    const deliveryDate = calculatedDeliveryDate(order.payment.location)



    return (
        <div className="confirmation-container" >
            <div className="order-info">
                <h1 className="thank-you">Thank you for your payment</h1>
                <p className="payment-font">You order has been confirmed and will be delivered soon.</p>
                <p>Order No. {order.id}</p>
                <hr className="cutsom-line-after-image" />
                <p>Order for: {order.userFirstName}</p>
                <p>Total Amount: {order.payment.paymentAmount} $</p>
                <p>Order Status: {order.status}</p>
                <p>Shipped Location: {order.payment.location}</p>
                <p>Estimated Delivery Date: {deliveryDate.toLocaleDateString()}</p>
                <NavLink to='/'>Return to Home</NavLink>
                <hr className="cutsom-line-after-image" />
            </div>
            <div className="map-container">
            <div className="delivery-status-header">
                <div className="status">
                    <p>Confirmed</p>
                    <i className="custom-icon fa-solid fa-circle-check"></i>
                    <p>{formatDate(order.createdAt)}</p>
                </div>
                <div className="separator"></div>
                <div className="status">
                    <p>On its way</p>
                    <i className="custom-icon fa-solid fa-circle-check"></i>
                    <p>{formatDate(order.createdAt)}</p>
                </div>
                <div className="separator"></div>
                <div className="status">
                    <p>Out for delivery</p>
                    <i className="custom-icon fa-solid fa-truck"></i>
                    <p>In Progress</p>
                </div>
                <div className="separator"></div>
                <div className="status">
                    <p>Delivered</p>
                    <i className="custom-icon fa-solid fa-house-chimney"></i>
                    <p>In Progress</p>
                </div>
            </div>
            {mapData && mapData.results &&
                <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={defaultCenter}>
                        <Marker key={defaultCenter.lat} position={defaultCenter}/>
                    </GoogleMap>
                </LoadScript>
            }
             </div>
        </div>
    )
}

export default ConfirmationPage;
