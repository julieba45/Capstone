import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from "../../store/favorite";
import { NavLink } from 'react-router-dom';
import { updateFavoritePlant } from "../../store/favorite";
import "./MyFavoritesPage.css"


const MyFavoritesPage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);
    const [reload, setReload] = useState(false);

    const handleDragStart = (event, favoriteId) => {
        event.dataTransfer.setData("favoriteId", favoriteId);
    }

    const handleDrop = async (event, gardenName) => {
        const favoriteId = event.dataTransfer.getData("favoriteId");
        await dispatch(updateFavoritePlant(favoriteId, gardenName));
        setReload(!reload);
    }

    useEffect(() => {
        console.log('HEYYYY------', favorites);
        dispatch(fetchFavorites());
    }, [dispatch, reload]);

    // Group favorites by garden
    const gardens = favorites.reduce((gardens, favorite) => {
        const gardenName = favorite.gardenName;

        if (!gardens[gardenName]) {
            gardens[gardenName] = [];
        }

        gardens[gardenName].push(favorite);

        return gardens;
    }, {});

    const sortedGardens = Object.entries(gardens).sort((a, b) => a[0].localeCompare(b[0]));

    return (
        <div className="favorites-container">
            <h1>Favorites</h1>
            <div className="gardens-grid">
            {sortedGardens.map(([gardenName, gardenFavorites]) => (
                <div key={gardenName} className="garden-column">
                    <h2>
                        Garden Name: <NavLink className="favorite-garden-name" to={`/garden/${gardenName}`}>{gardenName}</NavLink>
                    </h2>
                    {gardenFavorites.map((favorite) => (
                        <div
                            key={favorite.id}
                            className="favorite"
                            onDrop={(event) => handleDrop(event, gardenName)}
                            onDragOver={(event) => event.preventDefault()}
                        >
                            <p
                                draggable
                                onDragStart={(event) => handleDragStart(event, favorite.id)}
                            >
                                Plant Name:{favorite.plant.name}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
            </div>
        </div>
    );
}

export default MyFavoritesPage;
