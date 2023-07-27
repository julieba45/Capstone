import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const selectCartItemsCount = state =>
    state.cart.cart.orderPlants
        ? state.cart.cart.orderPlants.reduce((total, plant) => total + plant.quantity, 0)
        :0

const CartCount = () => {
    const itemCount = useSelector(selectCartItemsCount);
    const history = useHistory();
    const handleCartClick = () => {
        history.push('/cart');
    }
    return (
        <div onClick={handleCartClick}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>{itemCount}</span>
        </div>
    )
}

export default CartCount;
