const CREATE_REVIEW = 'review/CREATE_REVIEW'

const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

export const createReviewforPlant = (plantId, review) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${plantId}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(review)
    })
    if (response.ok){
        const data = await response.json()
        dispatch(createReview(data))
        return null
    } else {
        const errorData = await response.json();
        return errorData.errors || errorData.error
    }
}

const initialState = [];

const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_REVIEW:
            return [...state, action.payload]
        default:
            return state
    }
}

export default reviewReducer;
