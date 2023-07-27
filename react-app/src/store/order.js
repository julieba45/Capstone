const GET_ORDERS = "order/GET_ORDERS"

const getOrders = (orders) => ({
    type:GET_ORDERS,
    payload: orders
})

export const fetchOrders = () => async(dispatch) => {
    const response = await fetch(`/api/orders/current`);
    if(response.ok){
        const data = await response.json();
        dispatch(getOrders(data))
    }
}

const initialState = {
    orders: []
}

const orderReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload

            }
        default:
            return state;
    }
}

export default orderReducer
