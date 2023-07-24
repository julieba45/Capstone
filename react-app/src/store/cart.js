const SET_CART = "cart/SET_CART";
const ADD_PLANT = "cart/ADD_PLANT";


const setCart = (cart) => ({
    type: SET_CART,
    payload:cart
})

const addPlant = (plant) => ({
    type: ADD_PLANT,
    payload: plant
});


export const getCart = () => async(dispatch) => {
    const response = await fetch(`/api/cart/current`);
    // console.log('THE RESPONSE BACK', response)
    if(response.ok){
        const cart = await response.json();
        console.log('THE RESPONSE BACK', cart)
        dispatch(setCart(cart))
    } else if (response.status < 500){
        const data = response.json();
        if(data.errors){
            return data.errors;
        } else {
            return ('An error occurred. Please try again')
        }
    }
}

export const addToCart = (plant) => async(dispatch) => {
    const response = await fetch('/api/cart', {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plant)
    });

    if(response.ok){
        const newPlant = await response.json();
        dispatch(addPlant(newPlant));
    }
}

const initialState = {
    cart: []
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CART:
            return{
                ...state,
                cart: action.payload
            }
        case ADD_PLANT:
            return {
                ...state,
                cart: [...state.cart, action.payload] };
        default:
            return state
	}
}

export default cartReducer
