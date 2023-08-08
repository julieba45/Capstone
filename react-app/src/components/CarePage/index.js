import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../store/order";
import { Carousel } from 'react-responsive-carousel';
import "./CarePage.css"

const CarePage = () => {
    const location = useSelector(state => state.session.user.location)
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();
    const [currentPlant, setCurrentPlant] = useState(null);

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

    let plantsRendered = new Set() //only unique plants
    let plants = [];

    orders.forEach(order => {
        if (order.status === "Completed") {
            order.orderPlants.forEach(orderPlant => {
                if (!plantsRendered.has(orderPlant.plant.id)) {
                    plantsRendered.add(orderPlant.plant.id);
                    plants.push(orderPlant);
                }
            });
        }
    });

    if(plants.length === 0){
        return (
            <div className="care-page-noorders">
                <h1 className="main-care-noorders-header">Care</h1>
                <p>Welcome to the Care Page! Here, you'll find personalized care instructions for your plants based on your orders.</p>
                <p>Hmmm..No orders yet! <p>
                </p><a href="/plants">Click here </a> to browse our plants and start your journey towards a greener home.</p>
                <div>
                    {/* <img src="empty_orders_icon.png" alt="No orders" /> */}
                    <iframe
                        className="birdy"
                        style={{border: "none"}}
                        width="300"
                        height="500"
                        src="https://rive.app/s/c9PNX0ABuEmvNTUvnkU2tg/embed"
                        // src="https://rive.app/s/DBadkMOJEUCi8pA71_dsSA/embed"
                        allowFullScreen
                    />

                </div>
            </div>
        )
    }

    if (plants.length > 0 && currentPlant === null) {
        setCurrentPlant(plants[0]);
    }

    const handleSlideChange = (index) => {
        setCurrentPlant(plants[index]);
    }

    return (
        <div className="care-page-main">
            <div className="care-weather-column">
            <h1 className="main-care-header">Care</h1>
            <p>Use this information to provide the best care to your current plants!</p>
            {weatherData && (
                < div className="weather-container">
                    <div className="weather-row">
                        <div className="weather-info">
                            <i className="fa-solid fa-temperature-low"></i>
                            <p>Temperature: {Math.round(weatherData.days[0].temp)}°F</p>
                        </div>

                    <div className="weather-info">
                        <i className="fa-solid fa-cloud"></i>
                        <p>Weather: {weatherData.days[0].conditions}</p>
                    </div>
                    </div>
                    <div className="weather-row">
                        <div className="weather-info">
                            <i className="fa-solid fa-droplet"></i>
                            <p>Precipitation: {Math.round(weatherData.days[0].precip*100)}%</p>
                        </div>
                    </div>
                </div>
            )}
            {currentPlant && (
                    <>
                        <p>Plant Name: {currentPlant.plant.name}</p>
                        <p>Plant watering frequency: {currentPlant.plant.wateringFrequency} per day</p>
                        {/* const wateringAmount = currentPlant.plant.wateringFrequency * (1 - (weatherData.days[0].precip)); */}
                        <p>Adjusted watering amount based on precipitation: {(currentPlant.plant.wateringFrequency * (1 - (weatherData.days[0].precip))).toFixed(2)} per day</p>
                        {/* <p>Care Instructions: {currentPlant.plant.careInstructions}</p> */}
                    </>
                )}

            </div>

             <Carousel className="care-carousel" onChange={handleSlideChange} showStatus={false}>
             {plants.map((orderPlant, index) => (
                    orderPlant.plant.images && orderPlant.plant.images.length > 0 && (
                        <div key={index}>
                            {orderPlant.plant.images[0].isPrimary && (
                                <img className="care-plant-image" src={orderPlant.plant.images[0].pictureUrl} alt={orderPlant.plant.name}></img>
                            )}
                            {/* {plant.images.filter(image => !image.isPrimary).map((image, index) => (
                                <img key={index} className="plant-image" src={image.pictureUrl} alt={plant.name}></img>
                            ))} */}
                        </div>
                    )
                ))}



            </Carousel>

        </div>
    )
}

export default CarePage
