import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlants } from '../../store/plant';
import { useHistory } from 'react-router-dom';
import { addFavoritePlant } from '../../store/favorite';
import { fetchFavorites } from '../../store/favorite';

const GetAllPlants = () => {
    const dispatch = useDispatch()
    const plants = useSelector(state => state.plants.allPlants);
    const history = useHistory();
    const favorites = useSelector(state => state.favorites);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedPlantId, setSelectedPlantId] = useState(null);
    const [selectedGarden, setSelectedGarden] = useState('');

    useEffect(() => {
        // console.log(plants, 'HERE ARE ALL THE PLANTS')
        dispatch(getPlants());
        dispatch(fetchFavorites());
    }, [dispatch])

    const handleClick = (plantId) => {
        history.push(`/plants/${plantId}`)
    }

    const handleAddToFavorite = (plantId) => {
        setSelectedPlantId(plantId);
        setShowDropdown(true);
    }

    const handleSelectedGarden = (gardenName) => {
        dispatch(addFavoritePlant(selectedPlantId, gardenName, 1));
        setShowDropdown(false);
        setSelectedGarden('');

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
                        {showDropdown && selectedPlantId === plant.id && (
                            <select onChange={e => handleSelectedGarden(e.target.value)}>
                                <option value="">Select Garden</option>
                                {gardenNames.map((gardenName, i) => <option key={i} value={gardenName}>{gardenName}</option>)}

                            </select>
                        )}
                    </div>
                ))
            }
        </div>
    )
}

export default GetAllPlants;
