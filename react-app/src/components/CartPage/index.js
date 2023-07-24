import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../../store/cart';

const CartPage = () => {
    const dispatch = useDispatch();
    // const state =  useSelector(state => state);
    const cart = useSelector(state => state.cart.cart.orderPlants);

    useEffect(() => {
        dispatch(getCart())
        // console.log('-----STATE', state)
        console.log(cart, 'MY CART')
    }, [dispatch])

    return (
        <div>
        <h1>Cart</h1>
        {cart && cart.map(plantItem => (
            <div key={plantItem.id}>
                <h2>{plantItem.plant.name}</h2>
                {/* <img src={plantItem.plant.imageUrl} alt={plantItem.plant.name} /> */}
                <p>{plantItem.plant.description}</p>
                <p>{`Quantity: ${plantItem.quantity}`}</p>
            </div>
        ))}
    </div>
    )
}

export default CartPage;
