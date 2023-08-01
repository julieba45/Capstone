import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlant } from '../../store/plant';
import { addToCart } from '../../store/cart';
import { useParams } from 'react-router-dom';
import { getAllPlantReviews } from '../../store/review';
import { useModal } from '../../context/Modal';
import DeletePlantReviewModal from '../DeletePlantReviewModal';
import ReviewModal from '../ReviewModal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./PlantDetails.css"
import plantStructure from "./images/plant-structure.png"


const PlantDetails = () => {
    const dispatch = useDispatch();
    const { plantId } = useParams();
    const plant = useSelector(state => state.plants.currentPlant);
    const reviews = useSelector(state => state.reviews)
    const currentUser = useSelector(state => state.session.user);
    const [quantity, setQuantity] = useState(1);
    const {setModalContent} = useModal();
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getPlant(plantId));
        dispatch(getAllPlantReviews(plantId))
    }, [dispatch, plantId])

    const handleAddToCart = () => {
        dispatch(addToCart(plant, quantity));
    }

    const openDeleteModal = (reviewId) => {
        setModalContent(<DeletePlantReviewModal reviewId={reviewId}/>)
    }

    const openReviewModal = () => {
        setModalContent(<ReviewModal plantId={plantId} closeModal={closeModal}/>)
    }

    //formating the descriptions:
    let formattedInstructions = [];

    if (plant && plant.careInstructions) {
        const sections = plant.careInstructions.split('. ');
        sections.forEach((section, index) => {
            const [possibleTitle, ...descriptionParts] = section.split(' : ');
            if (possibleTitle.includes('&') || possibleTitle.includes('Please note') || index === 0) {
                const description = descriptionParts.join(' : ');
                formattedInstructions.push({ title: possibleTitle, description });
            } else {
                formattedInstructions[formattedInstructions.length - 1].description += '. ' + section;
            }
        });
    }


    return (
        <div>
            {/* <h2 className='plant-details'>{plant.name} */}
            {plant && plant.name && (
                <>
                <span className='font-one'>{plant.name.split(' ').slice(0, 2).join(' ')}</span>
                <span className='font-two'>{plant.name.split(' ').slice(2).join(' ')}</span>
                </>
            )}
            <div className='product-details'>
                <div className='product-images'>
                {plant.images && plant.images.length > 0 && (
                    <Carousel>
                    {plant.images[0].isPrimary && (
                        <img className="plant-image" src={plant.images[0].pictureUrl} alt={plant.name}></img>
                    )}
                    {plant.images.filter(image => !image.isPrimary).map((image, index) => (
                        <img key={index} className="plant-image" src={image.pictureUrl} alt={plant.name}></img>
                    ))}
                    </Carousel>
                )}
                </div>
                <div className='produce-info'>
                    {/* <h2>{plant.name}</h2> */}
                    <hr class="line-after-image"></hr>
                    <p className='plant-details-description'>{plant.description}</p>

                    <p>species: {plant.species}</p>
                    <p>plant size: {plant.size}</p>

                <div className='add-to-cart'>
                    <label>Quantity</label>
                    <input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    ></input>
                    <button className="general-green-btn"onClick={handleAddToCart}>Add to Cart</button>
                    <p className="plant-price">{plant.price ? `from $${plant.price.toFixed(2)}` : 'price...'}</p>
                </div>
                <div className='plant-detail-reviews'>
                    <h2>Reviews:</h2>
                    {reviews.map(review => (
                        <div key={review.id}>
                            <p>{review.user.firstName}</p>
                            <p className='nums'>{review.createdAt}</p>
                            <p>{review.reviewText}</p>
                            <p className='nums'>Rating: {review.rating}</p>

                            {currentUser && currentUser.id === review.userId && (
                                <button onClick={() => openDeleteModal(review.id)}>Delete Review</button>
                            )}

                        </div>
                    ))}
                    {currentUser && <button className="general-green-btn"onClick={openReviewModal}>Create a Review</button>}
                </div>

                </div>
                <div className='product-specs'>
                <h4 className='specs-tab'>CARE AND INSTRUCTIONS</h4>
                <div className='specs-content'>
                    <div className='instructions'>
                    {formattedInstructions.map((instruction, index) => (
                        <div key={index}>
                            <h3 className='font-two'>{instruction.title}</h3>
                            <p>{instruction.description}</p>
                            {/* <br /> */}
                        </div>
                    ))}
                    </div>
                    <img className='plant-structure-img' src={plantStructure} alt='logo' />
                </div>
            </div>
        </div>
    </div>
    )
}

export default PlantDetails;
