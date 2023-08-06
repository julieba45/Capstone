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


            {/* <iframe
                style={{border: "none"}}
                width="300"
                height="500"
                src="https://rive.app/s/ZA3G626QRkOXhfq1gXAP1g/embed"
                allowFullScreen
            /> */}
            </Carousel>

        </div>
    )
}

export default CarePage
