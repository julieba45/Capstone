import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlantFromCart, updatePlantInCart } from '../../store/cart';
import "./SideCart.css";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const SideCart = ({onClose})=>{
    const cart = useSelector(state => state.cart.cart.orderPlants);
    const dispatch = useDispatch();

    const handleUpdate = (plantItem, increment = true, e) => {
        e.stopPropagation();
        let newQuantity = increment ? plantItem.quantity + 1 : plantItem.quantity -1;
        newQuantity = Math.max(newQuantity, 1);
        const updatePlant = {
            ...plantItem,
            quantity: newQuantity
        }
        dispatch(updatePlantInCart(updatePlant))
    }

    const handleDelete = (plantId, e) => {
        e.stopPropagation();
        dispatch(deletePlantFromCart(plantId))
    }
    return (
        <div className="side-cart" onClick={(e) => e.stopPropagation()}>
            <div className="side-cart-header">
                <NavLink className="order-link" activeClassName="is-active" to="/cart" onClick={(e) => e.stopPropagation()}>View FullCart</NavLink>
                <button className="sidebar-close"onClick={onClose}>X</button>
            </div>
            <h2>Your Cart</h2>
            {cart && cart.map(plantItem => (
                <div key={plantItem.id} className="side-cart-item">
                    <img className="side-cart-image" src={plantItem.plant.images[0].pictureUrl} alt={plantItem.plant.name} />
                    <div className="side-cart-details">
                        <h3>{plantItem.plant.name}</h3>
                        <div className="increment-decrement-buttons">
                            <button onClick={(e) => handleUpdate(plantItem, true, e)}>+</button>
                            <p>{`${plantItem.quantity}`}</p>
                            <button onClick={(e) => handleUpdate(plantItem, false, e)}>-</button>
                        </div>
                    </div>
                    {/* <p>Quantity: {plantItem.quantity}</p> */}
                    {/* <p>Price: ${plantItem.plant.price}</p> */}
                    <button className="sidebar-remove-btn"onClick={(e) => handleDelete(plantItem.plantId, e)}>Remove</button>
                </div>
            ))}
            <NavLink className="sidecart-general-btn" aactiveClassName="is-active" to="/cart" onClick={(e) => e.stopPropagation()}>View Full Cart</NavLink>
        </div>
    );
}

export default SideCart
