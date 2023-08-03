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
    const [hoverStates, setHoverStates] = useState({});

    //Some hovering effect fcts
    const handleMouseEnter = (plantId) => {
        setHoverStates(prevStates => ({ ...prevStates, [plantId]: true }));
    };

    const handleMouseLeave = (plantId) => {
        setHoverStates(prevStates => ({ ...prevStates, [plantId]: false }));
    };


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

    const handleAddToFavorite = (plantId, e) => {
        e.stopPropagation();
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

    // <div className='garden-title-container'>
    //         <h1 className='garden-title'>{gardenName}</h1>
    //         <p className='collection-number'>248</p>
    //     </div>
    return (
        <div className='plants-container'>
            <div className='shop-all-container'>
                <h1 className='shop-all-header'>Shop All</h1>
                <p className='collection-number'>248</p>
            </div>
            <div className='plants-grid'>
            {
                plants.map(plant => (
                    <div key={plant.id} className='plant-card'  onMouseEnter={() => handleMouseEnter(plant.id)} onMouseLeave={() => handleMouseLeave(plant.id)} onClick={() => handleClick(plant.id)}>
                        {/* <p>{plant.description}</p> */}
                        {plant.images && plant.images.length > 0 && plant.images[0].isPrimary &&
                        <img className="plant-image" src={hoverStates[plant.id] ? (plant.images[1] ? plant.images[1].pictureUrl : plant.images[0].pictureUrl) : plant.images[0].pictureUrl} alt={plant.name}></img>
                        }
                        {/* <button onClick={() => handleClick(plant.id)}>See Details</button> */}
                        <hr className="line-after-image" />
                        <div className='tile-name-price'>
                            <h3>{plant.name}<i className={`fa fa-arrow-right ${hoverStates[plant.id] ? 'show-arrow' : 'hide-arrow'}`}></i></h3>
                            <p className="plant-price">from ${plant.price.toFixed(2)}</p>
                        </div>

                        <div className='tile-name-price'>
                            <p className="plant-size">{plant.size}</p>
                            {user && <button className="favorite-button" onClick={(e) => handleAddToFavorite(plant.id, e)}>
                                <i className="fa-regular fa-heart"></i>
                                </button>}
                        </div>
                        <p className="plant-ready">Ready to Ship</p>

                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default GetAllPlants;
