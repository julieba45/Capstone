import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const CarePage = () => {
    const location = useSelector(state => state.session.user.location)

    const [weatherData, setWeatherData] = useState(null);
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [loading, setLoading] = useState(true);

    const city = location.split(', ')[location.split(', ').length - 3];


    useEffect(() => {
        const fetchWeatherData = async () => {
            if(location){
                try{
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${process.env.REACT_APP_API_KEY}`);
                const data = await response.json();
                console.log('-----------LOCATION DATA', data)
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

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    return (
        <div>
            <h1>Care</h1>
            {weatherData && (
                <>
                    <p>Temperature: {Math.round(weatherData.days[0].temp)}°F</p>
                    <p>Weather: {weatherData.days[0].conditions}</p>
                    {/* <p>Description: {weatherData.weather[0].description}</p> */}
                    <p>Precipitation: {Math.round(weatherData.days[0].precip*100)}%</p>
                </>
            )}

        </div>
    )
}

export default CarePage
