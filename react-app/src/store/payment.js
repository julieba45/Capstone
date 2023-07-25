

const ADD_PAYMENT = 'payment/ADD_PAYMENT'

const addPayment = (payment) => ({
    type: ADD_PAYMENT,
    payload: payment
})

export const createPayment = (paymentInfo) => async(dispatch) => {
    // console.log('--------FAILED BODY', paymentInfo)
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

const initialState = [];

const paymentReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PAYMENT:
            return [...state, action.payload]
        default:
            return state
    }
}

export default paymentReducer;
