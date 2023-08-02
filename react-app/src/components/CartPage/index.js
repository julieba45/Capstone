import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePlantFromCart, getCart, updatePlantInCart } from '../../store/cart';
import { useHistory} from 'react-router-dom';
import "./CartPage.css"

const CartPage = () => {
    const dispatch = useDispatch();
    // const state =  useSelector(state => state);
    const cart = useSelector(state => state.cart.cart.orderPlants);
    const history = useHistory();
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(getCart())
        // console.log('-----STATE', state)
        console.log(cart, 'MY CART')
    }, [dispatch])

    const handleUpdate = (plantItem, increment = true) => {
        // console.log('HERE IS THE PLANTITEM', plantItem)
        let newQuantity = increment ? plantItem.quantity + 1 : plantItem.quantity -1;

        //quantity cannot go lower than 1
        newQuantity = Math.max(newQuantity, 1);

        const updatePlant={
            ...plantItem,
            quantity: newQuantity
        }
        dispatch(updatePlantInCart(updatePlant))
    }

    const handleDelete = (plantId) => {
        dispatch(deletePlantFromCart(plantId))
    }

    const handleCheckout = () => {
        if(user){
            history.push('/cart/payment')
        } else {
            history.push("/login", { from: { pathname: "/cart/payment" } });
        }
    }


    return (
        <div>
            <h1 className='MainCart'>Cart</h1>
            <div className='cart-page-container'>
                <div className='cart-page-header'>
                    <h4>Product</h4>
                    <h4>Size</h4>
                    <h4>QTY</h4>
                    <h4>Price</h4>
                </div>
                <hr class="line-after-image"></hr>
                {cart && cart.map(plantItem => (
                    <>
                    <div key={plantItem.id}  className="cart-page-item">
                        <div className="cart-name-img">
                            {plantItem.plant.images.filter(image => image.isPrimary).map((image, index) => (
                                <img key={index} src={image.pictureUrl} alt={plantItem.plant.name} />
                            ))}
                             <h2 className='plant-name-cart'>{plantItem.plant.name}</h2>
                        </div>
                        {/* <img src={plantItem.plant.imageUrl} alt={plantItem.plant.name} /> */}
                        <p>{plantItem.plant.size}</p>
                        <div>
                            <div className="increment-decrement-buttons">
                                <button onClick={() => handleUpdate(plantItem, true)}>+</button>
                                <p>{`${plantItem.quantity}`}</p>
                                <button onClick={() => handleUpdate(plantItem, false)}>-</button>
                            </div>
                        </div>
                        <p>${plantItem.plant.price}</p>

                        <button className="cart-removal-btns"onClick ={() => handleDelete(plantItem.plantId)}>Remove</button>
                    </div>
                      <hr class="line-after-image"></hr>
                    </>
                ))}
            </div>
            {cart && cart.length > 0 && <button className="custom-green-btn" onClick={handleCheckout}>Checkout</button>}
    </div>
    )
}

export default CartPage;
