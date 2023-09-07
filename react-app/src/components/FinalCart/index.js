import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/cart";
import "./FinalCart.css";

const FinalCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart.orderPlants);


    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    let totalCartCost = 0;
    if (cart) {
        totalCartCost = cart.reduce((acc, plantItem) => acc + (plantItem.quantity * plantItem.plant.price), 0);
    }

    return (
        <div className="final-cart-div">
            <h4 className='final-MainCart'>Order Summary</h4>
            <div className='final-cart-page-container'>
            <div className='final-cart-page-header'>
                    <h4>Product</h4>
                    {/* <h4>Size</h4> */}
                    <h4>QTY</h4>
                    <h4>Price</h4>
                </div>
            <hr className="line-after-image" />
            {cart && cart.map(plantItem => {
                const totalCost = plantItem.quantity * plantItem.plant.price;
                return(
                <div key={plantItem.id} className="final-cart-page-item">
                     <div className="cart-name-img">
                            {plantItem.plant.images.filter(image => image.isPrimary).map((image, index) => (
                                <img key={index} src={image.pictureUrl} alt={plantItem.plant.name} />
                            ))}
                             <h2 className='plant-name-cart'>{plantItem.plant.name}</h2>
                        </div>
                    {/* <p>{plantItem.plant.description}</p> */}
                    <p>{`Quantity: ${plantItem.quantity}`}</p>
                    <p>Price: ${plantItem.plant.price}</p>
                    {/* <p>Total Cost: ${totalCost}</p> */}
                    {/* <hr class="line-after-image"></hr> */}
                </div>
                )
            })}
            </div>
            <h2>Total Cost: ${totalCartCost}</h2>
    </div>
    )

}

export default FinalCart;
