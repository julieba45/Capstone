import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from "../../store/favorite";

const MyFavoritesPage = () => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)

    useEffect(() => {
        console.log('HEYYYY------', favorites)
        dispatch(fetchFavorites())
    }, [dispatch])

    return (
        <div>
            <h1>Favorites</h1>
            {favorites.map((favorite) => (
                <div key={favorite.id}>
                    <h2>Garden Name: {favorite.gardenName}</h2>
                    <p>Plant Name:{favorite.plant.name}</p>
                    {/* <img src={favorite.plant.primary_image} alt="Plant" /> */}
                    {/* <p>Created at: {new Date(favorite.createdAt).toLocaleString()}</p>
                    <p>Updated at: {new Date(favorite.updatedAt).toLocaleString()}</p> */}
                </div>
            ))}
        </div>
    )
}

export default MyFavoritesPage
