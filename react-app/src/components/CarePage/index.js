import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../store/order";
import { Carousel } from 'react-responsive-carousel';

const CarePage = () => {
    const location = useSelector(state => state.session.user.location)
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if(location){
                try{
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${process.env.REACT_APP_API_KEY}`);
                const data = await response.json();
                // console.log('-----------LOCATION DATA', data)
                const { lat, lng } = data.results[0].geometry.location;

                const weatherResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}/today?key=${process.env.REACT_APP_API_WEATHER}`)
                const weatherData = await weatherResponse.json()
                console.log('---------------WEATHER DATA', weatherData)
                setWeatherData(weatherData);
                setLoading(false);

                }catch(err){
                    console.error(err)

                }
            }
        }

        fetchWeatherData();
    }, [location])

    if (loading) {
        return <div>Loading...</div>
    }

    let plantsRendered = new Set()

    return (
        <div>
            <h1>Care</h1>
            {weatherData && (
                <>
                    <p>Temperature: {Math.round(weatherData.days[0].temp)}°F</p>
                    <p>Weather: {weatherData.days[0].conditions}</p>
                    <p>Precipitation: {Math.round(weatherData.days[0].precip*100)}%</p>
                </>
            )}
            {orders.map(order => (
                 order.status === "Completed" && order.orderPlants.map(orderPlant => {
                    if(plantsRendered.has(orderPlant.plant.id)){
                        return null;
                    } else {
                        plantsRendered.add(orderPlant.plant.id)
                    }
                    const wateringAmount = orderPlant.plant.wateringFrequency * (1 - (weatherData.days[0].precip));
                    return (
                        <div key={orderPlant.id}>

                            <p>Plant Name: {orderPlant.plant.name}</p>
                            <p>Plant watering frequency: {orderPlant.plant.wateringFrequency} per day</p>
                            <p>Adjusted watering amount based on precipitation: {wateringAmount.toFixed(2)} per day</p>
                            {/* <p>Care Instructions: {orderPlant.plant.careInstructions}</p> */}
                            {orderPlant.plant.images && orderPlant.plant.images.length > 0 && (
                                <Carousel>
                                {orderPlant.plant.images[0].isPrimary && (
                                    <img className="plant-image" src={orderPlant.plant.images[0].pictureUrl} alt={orderPlant.plant.name}></img>
                                )}
                                {/* {plant.images.filter(image => !image.isPrimary).map((image, index) => (
                                    <img key={index} className="plant-image" src={image.pictureUrl} alt={plant.name}></img>
                                ))} */}
                                </Carousel>
                            )}
                        </div>
                    )
                })
            ))}
            {/* <iframe
                style={{border: "none"}}
                width="300"
                height="500"
                src="https://rive.app/s/ZA3G626QRkOXhfq1gXAP1g/embed"
                allowFullScreen
            /> */}

        </div>
    )
}

export default CarePage
