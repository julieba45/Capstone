import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getOrder } from "../../store/cart";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const ConfirmationPage = () => {
    const dispatch = useDispatch();
    const {orderId} = useParams();
    const order = useSelector(state => state.cart.order)

    const [loading, setLoading] = useState(true);
    const [mapData, setMapData] = useState(null);


    useEffect(() => {
        console.log("---------ORDER AND ORDERID",order, orderId)
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


    return (
        <div>
            <h1>Thank you for your payment!</h1>
            <p>You order has been confirmed and will be processed soon.</p>
            <p>Order ID: {order.id}</p>
            <p>Order for: {order.userFirstName}</p>
            <p>Total Amount: {order.payment.paymentAmount}</p>
            <p>Order Status: {order.status}</p>
            <p>Shipped Location: {order.payment.location}</p>
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
            <NavLink to='/'>Return to Home</NavLink>
        </div>
    )
}

export default ConfirmationPage;
