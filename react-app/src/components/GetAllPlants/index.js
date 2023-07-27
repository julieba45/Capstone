import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlants } from '../../store/plant';
import { useHistory } from 'react-router-dom';
import { addFavoritePlant } from '../../store/favorite';
import { fetchFavorites } from '../../store/favorite';
import GardenSelectionModal from '../GardenSelectionModal';
import { useModal } from '../../context/Modal';

const GetAllPlants = () => {
    const dispatch = useDispatch()
    const plants = useSelector(state => state.plants.allPlants);
    const history = useHistory();
    const favorites = useSelector(state => state.favorites);
    const {setModalContent} = useModal()

    useEffect(() => {
        // console.log(plants, 'HERE ARE ALL THE PLANTS')
        dispatch(getPlants());
        dispatch(fetchFavorites());
    }, [dispatch])

    const handleClick = (plantId) => {
        history.push(`/plants/${plantId}`)
    }

    const handleAddToFavorite = (plantId) => {
        setModalContent(
            <GardenSelectionModal
            gardenNames={gardenNames}
            onGardenSelect={(gardenName) => handleSelectedGarden(plantId, gardenName)}
            />
        )
    }

    const handleSelectedGarden = (plantId, gardenName) => {
        dispatch(addFavoritePlant(plantId, gardenName, 1));
        setModalContent(null);
    }

    //removing dupes
    const gardenNames = [...new Set(favorites.map(favorite => favorite.gardenName))];

    return (
        <div>
            <h1>Plant List</h1>
            {
                plants.map(plant => (
                    <div key={plant.id}>
                        <h2>{plant.name}</h2>
                        <p>{plant.description}</p>
                        <button onClick={() => handleClick(plant.id)}>See Details</button>
                        <button onClick={() => handleAddToFavorite(plant.id)}>Add to Favorites</button>
                    </div>
                ))
            }
        </div>
    )
}

export default GetAllPlants;
