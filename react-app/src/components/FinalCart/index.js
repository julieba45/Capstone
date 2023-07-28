import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/cart";

const FinalCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart.orderPlants);


    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    return (
        <div>
        <h1>Cart</h1>
        {cart && cart.map(plantItem => {
            const totalCost = plantItem.quantity * plantItem.plant.price;
            return(
            <div key={plantItem.id}>
                <h2>{plantItem.plant.name}</h2>
                {/* <img src={plantItem.plant.imageUrl} alt={plantItem.plant.name} /> */}
                <p>{plantItem.plant.description}</p>
                <p>{`Quantity: ${plantItem.quantity}`}</p>
                <p>Price: ${plantItem.plant.price}</p>
                <p>Total Cost: ${totalCost}</p>
            </div>
            )
        })}
    </div>
    )

}

export default FinalCart;
