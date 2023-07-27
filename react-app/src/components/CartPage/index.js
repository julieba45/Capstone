import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePlantFromCart, getCart, updatePlantInCart } from '../../store/cart';
import { NavLink, useHistory} from 'react-router-dom';

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

    const handleUpdate = (plantItem) => {
        const updatePlant={
            ...plantItem,
            quantity: plantItem.quantity + 1
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
            history.push('/login')
        }
    }


    return (
        <div>
        <h1>Cart</h1>
        {cart && cart.map(plantItem => (
            <div key={plantItem.id}>
                <h2>{plantItem.plant.name}</h2>
                {/* <img src={plantItem.plant.imageUrl} alt={plantItem.plant.name} /> */}
                <p>{plantItem.plant.description}</p>
                <p>{`Quantity: ${plantItem.quantity}`}</p>
                {/* <p>{plantItem.plantId}</p> */}
                <button onClick={() => handleUpdate(plantItem)}>Update</button>
                <button onClick ={() => handleDelete(plantItem.plantId)}>Delete</button>
            </div>
        ))}
         {cart && cart.length > 0 && <button onClick={handleCheckout}>Checkout</button>}
    </div>
    )
}

export default CartPage;
