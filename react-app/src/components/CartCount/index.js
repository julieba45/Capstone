import React from "react";
import { useSelector } from "react-redux";

const selectCartItemsCount = state =>
    state.cart.cart.orderPlants
        ? state.cart.cart.orderPlants.reduce((total, plant) => total + plant.quantity, 0)
        :0

const CartCount = () => {
    const itemCount = useSelector(selectCartItemsCount);
    return (
        <div>
             <span>Cart: {itemCount}</span>
        </div>
    )
}

export default CartCount;
