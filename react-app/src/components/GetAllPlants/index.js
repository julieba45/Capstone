import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlants } from '../../store/plant';
import { useHistory } from 'react-router-dom';
import { addFavoritePlant } from '../../store/favorite';
import { fetchFavorites } from '../../store/favorite';
import GardenSelectionModal from '../GardenSelectionModal';
import { addToCart } from '../../store/cart';
import { useModal } from '../../context/Modal';
import SideCart from '../SideCart';
import "./GetAllPlants.css";

const GetAllPlants = () => {
    const dispatch = useDispatch()
    const plants = useSelector(state => state.plants.allPlants);
    const history = useHistory();
    const favorites = useSelector(state => state.favorites);
    const {setModalContent} = useModal()
    const user = useSelector(state => state.session.user)
    const [hoverStates, setHoverStates] = useState({});
    const [notification, setNotification] = useState("");
    const [showSideCart, setShowSideCart] = useState(false);


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
        // console.log('THE USER',user)
        if(user){
            dispatch(fetchFavorites());
        }
    }, [dispatch, user])

    const handleClick = (plantId) => {
        history.push(`/plants/${plantId}`)
    }

    const handleAddToFavorite = (plantId, e) => {
        e.stopPropagation();
        const selectedPlant = plants.find(plant => plant.id === plantId);
        // console.log('--------GARDEN NAMES', gardenNames)
        if(user){
        setModalContent(
            <GardenSelectionModal
            gardenNames={gardenNames}
            onGardenSelect={(gardenName) => handleSelectedGarden(plantId, gardenName)}
            plantImage={selectedPlant.images[0].pictureUrl}
            plantName={selectedPlant.name}
            />
        )
        }
    }

    const handleSelectedGarden = (plantId, gardenName) => {
        dispatch(addFavoritePlant(plantId, gardenName, 1));
        setModalContent(null);
        setNotification("Plant successfully added to your garden!");
    }

    const handleAddToCart = (plant, e) => {
        e.stopPropagation();
        dispatch(addToCart(plant, 1));
        // TODO: Open the side cart
        setShowSideCart(true)

    }

    useEffect(() => {
        if(notification){
            const timer = setTimeout(() => {
                setNotification("")
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification])

    //removing dupes
    const gardenNames = [...new Set([...favorites.map(favorite => favorite.gardenName), 'My Favorites'])];

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
                        <div className="plant-image-container">
                            {plant.images && plant.images.length > 0 && plant.images[0].isPrimary &&
                            <img className="plant-image" src={hoverStates[plant.id] ? (plant.images[1] ? plant.images[1].pictureUrl : plant.images[0].pictureUrl) : plant.images[0].pictureUrl} alt={plant.name}></img>
                            }
                            {hoverStates[plant.id] &&
                            <button className="add-to-cart-button" onClick={(e) => handleAddToCart(plant, e)}>Quick Add</button>
                            }
                        </div>

                        {showSideCart && <SideCart onClose={(e) => {e.stopPropagation(); setShowSideCart(false)}} />}
                        {/* <button onClick={() => handleClick(plant.id)}>See Details</button> */}
                        <hr className="line-after-image" />
                        <div className='tile-name-price'>
                            <h3>{plant.name}<i className={`fa fa-arrow-right ${hoverStates[plant.id] ? 'show-arrow' : 'hide-arrow'}`}></i></h3>
                            <p className="plant-price">from ${plant.price.toFixed(2)}</p>
                        </div>

                        <div className='tile-name-price'>
                            <p className="plant-size">{plant.size}</p>
                            {user && <button className="favorite-button" onClick={(e) => handleAddToFavorite(plant.id, e)}>
                                <i className="fa-solid fa-seedling"></i>
                                </button>}
                        </div>

                        <p className="plant-ready">Ready to Ship</p>

                    </div>
                ))
            }
            </div>

            {notification &&
                <div className="notification">
                    <i className="fa-solid fa-check" style={{color: "#41511f"}}></i>
                    {notification}
                </div>
            }
        </div>
    )
}

export default GetAllPlants;
