import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteFavoritePlant, fetchGardenFavorites } from '../../store/favorite';
import "./GardenDetailsPage.css"


const GardenDetailsPage = () => {
    const dispatch = useDispatch();
    const { gardenName } = useParams();
    const favorites = useSelector(state => state.favorites);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchGardenFavorites(gardenName)).then(() => {
            setLoading(false);
        });
    }, [dispatch, gardenName]);

    const handleDelete = (favoriteId) => {
        dispatch(deleteFavoritePlant(favoriteId))
    }

    return (
        <div>
            {loading ? (
            <div>Loading...</div>
            ) : (
            <div>
                <div className='garden-title-container'>
                    <h1 className='garden-title'>{gardenName}</h1>
                    <p className='collection-number'>248</p>
                </div>
                <div className='grid-favorite-details'>
                {favorites.map((favorite) => (
                        <div key={favorite.id} className='grid-favorite-item'>
                            <div className='favorite-image-container'>
                            <img src={favorite.plantPrimaryImage.primary_image} alt={favorite.plant.name}></img>
                            </div>
                            <p>Plant Name: {favorite.plant.name}</p>
                            {/* <img src={plantPrimaryImage.primary_image} alt={favorite.plant.name} /> */}
                            <p>Species: {favorite.plant.species}</p>
                            <p>Size: {favorite.plant.size}</p>
                            {/* <p>Description: {favorite.plant.description}</p> */}
                            {/* <p>Care Instructions: {favorite.plant.careInstructions}</p> */}
                            <p>Price: $ {favorite.plant.price}</p>
                            <p>Is In Bloom: {favorite.plant.isInBloom ? 'Yes' : 'No'}</p>
                            <p>Watering Frequency: {favorite.plant.wateringFrequency}</p>
                            {/* <p>Created at: {new Date(favorite.createdAt).toLocaleString()}</p>
                            <p>Updated at: {new Date(favorite.updatedAt).toLocaleString()}</p> */}
                            <button className="garden-deets-btn"onClick={() => handleDelete(favorite.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    )
}
export default GardenDetailsPage;
