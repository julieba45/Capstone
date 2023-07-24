import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlants } from '../../store/plant';
import { useHistory } from 'react-router-dom';

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

    return (
        <div>
            <h1>Plant List</h1>
            {
                plants.map(plant => (
                    <div key={plant.id}>
                        <h2>{plant.name}</h2>
                        <p>{plant.description}</p>
                        <button onClick={() => handleClick(plant.id)}>See Details</button>
                    </div>
                ))
            }
        </div>
    )
}

export default GetAllPlants;
