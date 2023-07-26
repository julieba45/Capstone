import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlants } from '../../store/plant';
import { useHistory } from 'react-router-dom';
import { addFavoritePlant } from '../../store/favorite';

const GetAllPlants = () => {
    const dispatch = useDispatch()
    const plants = useSelector(state => state.plants.allPlants);
    const history = useHistory()

    useEffect(() => {
        // console.log(plants, 'HERE ARE ALL THE PLANTS')
        dispatch(getPlants());
    }, [dispatch])

    const handleClick = (plantId) => {
        history.push(`/plants/${plantId}`)
    }

    const AddingFavoritePlant = (plantId, gardenName, position) => {
        dispatch(addFavoritePlant(plantId, gardenName, position))
    }

    return (
        <div>
            <h1>Plant List</h1>
            {
                plants.map(plant => (
                    <div key={plant.id}>
                        <h2>{plant.name}</h2>
                        <p>{plant.description}</p>
                        <button onClick={() => handleClick(plant.id)}>See Details</button>
                        <button onClick={() => AddingFavoritePlant(plant.id, 'Default Garden', 1)}>Add to Favorites</button>
                    </div>
                ))
            }
        </div>
    )
}

export default GetAllPlants;
