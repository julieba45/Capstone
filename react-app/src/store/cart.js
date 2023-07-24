const SET_CART = "cart/SET_CART";
const ADD_PLANT = "cart/ADD_PLANT";
const UPDATE_PLANT = "cart/UPDATE_PLANT";
const DELETE_PLANT = "cart/DELETE_PLANT";


const setCart = (cart) => ({
    type: SET_CART,
    payload:cart
})

const addPlant = (plant) => ({
    type: ADD_PLANT,
    payload: plant
});

const updatePlant = (plant) => ({
    type: UPDATE_PLANT,
    payload: plant
})

const deletePlant = (plantId) => ({
    type:DELETE_PLANT,
    payload: plantId
})


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

export const updatePlantInCart = (plant) => async(dispatch) => {
    console.log('--------Plant in thunk', plant)
    const response = await fetch(`/api/cart/${plant.plantId}`, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(plant)
    });

    if(response.ok){
        const data = await response.json();
        console.log('MY RESPONSE FROM THUNK UPDATE', data)
        dispatch(updatePlant(data))
    }
}

export const deletePlantFromCart= (plantId) => async(dispatch) => {
    const response = await fetch(`/api/cart/${plantId}`, {
        method:'DELETE'
    })
    if(response.ok){
        dispatch(deletePlant(plantId))
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
        case UPDATE_PLANT:
            // console.log('-------STATE CART', state.cart)
            // console.log('-------NEW PLANT', action.payload)
            return {
                ...state,
                cart: {
                    ...state.cart,
                    orderPlants: [...action.payload.cart.orderPlants]
                }
            }
        case DELETE_PLANT:
            return {
                cart: {
                    ...state.cart,
                    orderPlants: state.cart.orderPlants.filter(plant => plant.plantId !== action.payload)
                }
            }

        default:
            return state
	}
}

export default cartReducer
