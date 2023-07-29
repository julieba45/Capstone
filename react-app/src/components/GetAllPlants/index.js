import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlants } from '../../store/plant';
import { useHistory } from 'react-router-dom';
import { addFavoritePlant } from '../../store/favorite';
import { fetchFavorites } from '../../store/favorite';
import GardenSelectionModal from '../GardenSelectionModal';
import { useModal } from '../../context/Modal';
import "./GetAllPlants.css";

const GetAllPlants = () => {
    const dispatch = useDispatch()
    const plants = useSelector(state => state.plants.allPlants);
    const history = useHistory();
    const favorites = useSelector(state => state.favorites);
    const {setModalContent} = useModal()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        // console.log(plants, 'HERE ARE ALL THE PLANTS')
        dispatch(getPlants());
        console.log('THE USER',user)
        if(user){
            dispatch(fetchFavorites());
        }
    }, [dispatch, user])

    const handleClick = (plantId) => {
        history.push(`/plants/${plantId}`)
    }

    const handleAddToFavorite = (plantId) => {
        if(user){
        setModalContent(
            <GardenSelectionModal
            gardenNames={gardenNames}
            onGardenSelect={(gardenName) => handleSelectedGarden(plantId, gardenName)}
            />
        )
        }
    }

    const handleSelectedGarden = (plantId, gardenName) => {
        dispatch(addFavoritePlant(plantId, gardenName, 1));
        setModalContent(null);
    }

    //removing dupes
    const gardenNames = [...new Set(favorites.map(favorite => favorite.gardenName))];

    return (
        <div className='plants-container'>
            <h1>Plant List</h1>
            <div className='plants-grid'>
            {
                plants.map(plant => (
                    <div key={plant.id} className='plant-card'>
                        <h2>{plant.name}</h2>
                        <p>{plant.description}</p>
                        {plant.images && plant.images.length > 0 && plant.images[0].isPrimary &&
                        <img className="plant-image" src={plant.images[0].pictureUrl} alt={plant.name}></img>
                        }
                        <button onClick={() => handleClick(plant.id)}>See Details</button>
                        {user && <button onClick={() => handleAddToFavorite(plant.id)}>
                            <i className="fa-regular fa-heart"></i>
                            </button>}
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default GetAllPlants;
