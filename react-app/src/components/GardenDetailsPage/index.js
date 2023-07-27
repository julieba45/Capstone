import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGardenFavorites } from '../../store/favorite';

const GardenDetailsPage = () => {
    const dispatch = useDispatch();
    const { gardenName } = useParams();
    const favorites = useSelector(state => state.favorites);

    useEffect(() => {
        dispatch(fetchGardenFavorites(gardenName));
    }, [dispatch, gardenName]);



    return (
        <div>
        <h1>{gardenName}</h1>
        {favorites.map((favorite) => (
                <div key={favorite.id}>
                    <p>Plant Name: {favorite.plant.name}</p>
                    {/* <img src={plantPrimaryImage.primary_image} alt={favorite.plant.name} /> */}
                    <p>Species: {favorite.plant.species}</p>
                    <p>Size: {favorite.plant.size}</p>
                    <p>Description: {favorite.plant.description}</p>
                    <p>Care Instructions: {favorite.plant.careInstructions}</p>
                    <p>Price: $ {favorite.plant.price}</p>
                    <p>Is In Bloom: {favorite.plant.isInBloom ? 'Yes' : 'No'}</p>
                    <p>Watering Frequency: {favorite.plant.wateringFrequency}</p>
                    {/* <p>Created at: {new Date(favorite.createdAt).toLocaleString()}</p>
                    <p>Updated at: {new Date(favorite.updatedAt).toLocaleString()}</p> */}
                </div>
            ))}
        </div>
    )
}
export default GardenDetailsPage;
