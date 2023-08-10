import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../store/order";
import "./CarePage.css"
import CircularProgress from "./CircularProgress";
import { useModal } from "../../context/Modal";

const CarePage = () => {
    const location = useSelector(state => state.session.user.location)
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();
    const [currentPlant, setCurrentPlant] = useState(null);
    const user = useSelector(state => state.session.user.firstName)
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {setModalContent} = useModal();

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
                // console.log('---------------WEATHER DATA', weatherData)
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
                <p className="no-orders-yet">Hmmm..No orders yet! </p>
                <p className="add-an-order-link"><a href="/plants">Add an order</a></p>
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

    // const handleSlideChange = (index) => {
    //     setCurrentPlant(plants[index]);
    // }
    const handleTileClick = (orderPlant) => {
        setCurrentPlant(orderPlant);
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const showCareInstructions = () => {
        const modalContent = (
            <div className="care-instructions-container">
                <div className="care-instructions-modal">
                    <h2  className="care-instructions-title">Care Instructions</h2>
                    <p className="care-instructions-text">{currentPlant.plant.careInstructions}</p>
                </div>
            </div>
        );
        setModalContent(modalContent);
      };


    return (
        <div className="care-page-main">
            {/* <div className="care-dashboard"> */}
            {/* First Column */}
            <div className="care-user-info">

                {weatherData && (
                    <div className="weather-container">
                        <h2 className="user-name">Welcome, {user}!</h2>
                        <p>Here, you'll find personalized care instructions for your plants based on your orders.</p>
                        <div className="user-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <p>{location}</p>
                        </div>
                        <div className="weather-info">
                            <i className="fa-solid fa-temperature-low"></i>
                            <span className="weather-text">Temperature: {Math.round(weatherData.days[0].temp)}°F</span>
                        </div>
                        <div className="weather-info">
                            <i className="fa-solid fa-cloud"></i>
                            <span className="weather-text">Weather: {weatherData.days[0].conditions}</span>
                        </div>
                        <div className="weather-info">
                            <i className="fa-solid fa-droplet"></i>
                            <span className="weather-text">Precipitation: {Math.round(weatherData.days[0].precip*100)}%</span>
                        </div>
                        <div className="weather-info">
                            <a href="/plants" className="add-more-plants-button">Shop More Plants</a>
                        </div>
                    </div>
                )}

            </div>
            {/* <Carousel className="care-carousel" onChange={handleSlideChange} showStatus={false}> */}
            {/* Second Column */}
            <div className="care-plant-tiles">
             {plants.map((orderPlant, index) => (
                    orderPlant.plant.images && orderPlant.plant.images.length > 0 && (
                        <div key={index} className="plant-tile" onClick={() => handleTileClick(orderPlant)}>
                            {orderPlant.plant.images[0].isPrimary && (
                                <img className="care-plant-image" src={orderPlant.plant.images[0].pictureUrl} alt={orderPlant.plant.name}></img>
                            )}
                             <div className="plant-middle-info">
                                <h2>{orderPlant.plant.name}</h2>
                                <p>size: {orderPlant.plant.size}</p>
                                <p>species: {orderPlant.plant.species}</p>
                            </div>
                            {/* <p>{orderPlant.plant.description}</p> */}
                            {/* <p>{orderPlant.plant.careInstructions}</p> */}
                        </div>
                    )
                ))}
            </div>

            {/* <p>Use this information to provide the best care to your current plants!</p> */}
            {/* Third Column (Sidebar) */}
            <div className="">
            {sidebarOpen && currentPlant && (
                    <div className="care-plant-details">
                        <button onClick={closeSidebar}>Close</button>
                        <p>Plant Name: {currentPlant.plant.name}</p>
                        {currentPlant.plant.images[0].isPrimary && (
                            <img className="care-plant-sidebar-image" src={currentPlant.plant.images[0].pictureUrl} alt={currentPlant.plant.name}></img>
                        )}
                        {/* <p>Plant watering frequency: {currentPlant.plant.wateringFrequency} cup per day</p> */}
                        {/* const wateringAmount = currentPlant.plant.wateringFrequency * (1 - (weatherData.days[0].precip)); */}
                        <p>Plant watering frequency: {currentPlant.plant.wateringFrequency} cup per day</p>
                        <CircularProgress percentage={100} label={`${currentPlant.plant.wateringFrequency} cup per day`} />
                            {(() => {
                                const adjustedWateringAmount = currentPlant.plant.wateringFrequency * (1 - (weatherData.days[0].precip));
                                const maxWateringAmount = currentPlant.plant.wateringFrequency
                                // console.log('-------max', maxWateringAmount)
                                const percentage = Math.max(0, adjustedWateringAmount / maxWateringAmount * 100);
                                if (adjustedWateringAmount <= 0) {
                                    return <p>No additional watering needed</p>;
                                } else {
                                    return (
                                        <>
                                        <p>Adjusted watering amount based on precipitation:</p>
                                        <CircularProgress percentage={percentage} label={`${adjustedWateringAmount.toFixed(2)} cups per day`} />

                                      </>

                                    )
                                    // <p>Adjusted watering amount based on precipitation: {adjustedWateringAmount.toFixed(2)} cups per day</p>;
                                    }
                            })()}
                            <button onClick={showCareInstructions}> + Read More</button>
                        {/* <p>Care Instructions: {currentPlant.plant.careInstructions}</p> */}
                    </div>
                )}
            </div>
        </div>
    )

}

export default CarePage
