import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from "../../store/favorite";
import { NavLink } from 'react-router-dom';
import { updateFavoritePlant } from "../../store/favorite";

const MyFavoritesPage = () => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)
    const [reload, setReload] = useState(false);

    useEffect(() => {
        console.log('HEYYYY------', favorites)
        dispatch(fetchFavorites())
    }, [dispatch, reload])

    const handleUpdateClick = async (favoriteId) => {
        await dispatch(updateFavoritePlant(favoriteId, "New Garden Name"));
        setReload(!reload);

    }

    return (
        <div>
            <h1>Favorites</h1>
            {favorites.map((favorite) => (
                <div key={favorite.id}>
                    <h2>
                        Garden Name: <NavLink to={`/garden/${favorite.gardenName}`}>{favorite.gardenName}</NavLink>
                    </h2>
                    <p>Plant Name:{favorite.plant.name}</p>
                    {/* <img src={favorite.plant.primary_image} alt="Plant" /> */}
                    {/* <p>Created at: {new Date(favorite.createdAt).toLocaleString()}</p>
                    <p>Updated at: {new Date(favorite.updatedAt).toLocaleString()}</p> */}
                     <button onClick={() => handleUpdateClick(favorite.id)}>Move to New Garden</button>
                </div>
            ))}
        </div>
    )
}

export default MyFavoritesPage
