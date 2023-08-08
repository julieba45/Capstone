

const ADD_PAYMENT = 'payment/ADD_PAYMENT';
const DELETE_PAYMENT = 'payment/DELETE_PAYMENT';

const addPayment = (payment) => ({
    type: ADD_PAYMENT,
    payload: payment
})

const deletePayment = (paymentId) => ({
    type:DELETE_PAYMENT,
    payload: paymentId
})

export const createPayment = (paymentInfo) => async(dispatch) => {
    // console.log('--------PAYMENT FAILED BODY', JSON.stringify(paymentInfo))
    const response = await fetch(`/api/payments`, {
        method: 'POST',
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(paymentInfo)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(addPayment(data))
        // console.log('-------PAYMENT RETURN', data)
        return data
    }else {
        const errorData = await response.json();
        return errorData.errors || errorData.error
    }
}

export const cancelPayment = (paymentId) => async(dispatch) => {
    const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'DELETE'
    })
    if(response.ok){
       dispatch(deletePayment(paymentId))
       return {ok: true}
    } else {
        const errorData = await response.json();
        return errorData.errors || errorData.error
    }
}

const initialState = [];

const paymentReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PAYMENT:
            return [...state, action.payload]
        case DELETE_PAYMENT:
            return state.filter(payment => payment.id !== action.payload)
        default:
            return state
    }
}

export default paymentReducer;
