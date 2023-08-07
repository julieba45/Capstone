import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from "../../store/favorite";
import { updateFavoritePlant } from "../../store/favorite";
import { updateGarden } from "../../store/favorite";
import "./MyFavoritesPage.css"
import GardenName from './GardenName';


const MyFavoritesPage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);
    const [reload, setReload] = useState(false);
    const [draggedOverGarden, setDraggedOverGarden] = useState(null);

    const handleDragOver = (event, gardenName) => {
        event.preventDefault();
        setDraggedOverGarden(gardenName);
    }

    const handleDragStart = (event, favoriteId) => {
        event.dataTransfer.setData("favoriteId", favoriteId);
        event.currentTarget.classList.add('dragging');
        document.querySelectorAll('.garden-column').forEach(column => column.classList.add('highlight'));
        // event.currentTarget.parentNode.classList.add('favorite-dragging');
    }

    const handleDragEnd = (event) => {
        event.currentTarget.classList.remove('dragging');
        document.querySelectorAll('.garden-column').forEach(column => column.classList.remove('highlight'));
        setDraggedOverGarden(null);
    }

    const handleDrop = async (event, gardenName) => {
        const favoriteId = event.dataTransfer.getData("favoriteId");
        await dispatch(updateFavoritePlant(favoriteId, gardenName));
        setReload(!reload);
        setDraggedOverGarden(null);
    }

    useEffect(() => {
        // console.log('HEYYYY------', favorites);
        dispatch(fetchFavorites());
    }, [dispatch, reload]);

    // Group favorites by garden
    const gardens = favorites.reduce((gardens, favorite) => {
        const gardenName = favorite.gardenName;

        if (!gardens[gardenName]) {
            gardens[gardenName] = [];
        }

        gardens[gardenName].push(favorite);
        gardens[gardenName].sort((a, b) => a.position - b.position);

        return gardens;
    }, {});

    const sortedGardens = Object.entries(gardens).sort((a, b) => a[0].localeCompare(b[0]));

    const handleNameUpdate = (oldName, newName) => {
        if (newName.trim().length === 0) {
            alert('Garden name cannot be empty!');
            return;
        }
        dispatch(updateGarden(oldName, newName));
    };

    return (
        <div className="favorites-container">
            <h1 className="favorites-main-header">My Gardens</h1>
            <p> Create and customize your own personal gardens. Drag and drop plants into the garden you want.</p>
            <div className="gardens-grid">
            {sortedGardens.map(([gardenName, gardenFavorites]) => (
                <div
                    key={gardenName}
                    className={`garden-column ${draggedOverGarden === gardenName ? 'dragged-over' : ''}`}
                    style={{ '--num-plants': gardenFavorites.length }}
                    onDrop={(event) => handleDrop(event, gardenName)}
                    onDragOver={(event) => handleDragOver(event, gardenName)}
                >
                    <h2>
                        <GardenName gardenName={gardenName} onNameUpdate={handleNameUpdate} />
                    </h2>
                    {gardenFavorites.map((favorite) => (
                        <div
                            key={favorite.id}
                            className="favorite"
                            draggable
                            onDragStart={(event) => handleDragStart(event, favorite.id)}
                            onDragEnd={handleDragEnd}

                        >
                            <p>
                                Plant Name:{favorite.plant.name}
                            </p>
                        </div>
                    ))}
                    {draggedOverGarden === gardenName && <div className="favorite-placeholder"></div>}
                </div>
            ))}
            </div>
        </div>
    );
}

export default MyFavoritesPage;
