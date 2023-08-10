const CREATE_REVIEW = 'review/CREATE_REVIEW'
const GET_REVIEWS = "review/GET_REVIEWS"
const DELETE_REVIEW = "review/DELETE_REVIEW"

const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

const getReviews = (reviews) => ({
    type:GET_REVIEWS,
    payload: reviews
})

const deleteReview = (reviewId) => ({
    type:DELETE_REVIEW,
    payload: reviewId
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

export const getAllPlantReviews = (plantId) => async(dispatch) => {
    const response = await fetch(`/api/plants/${plantId}/reviews`);
    if(response.ok){
        const data = await response.json();
        dispatch(getReviews(data));
    }
}

export const deleteReviewById = (reviewId) => async(dispatch) => {

    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if(response.ok){
        // console.log(response, 'IN THE DELETE THUNK')
        dispatch(deleteReview(reviewId))
    }
}

const initialState = [];

const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_REVIEW:
            return [...state, action.payload]
        case GET_REVIEWS:
            return action.payload
        case DELETE_REVIEW:
            return state.filter(review => review.id !== action.payload)
        default:
            return state
    }
}

export default reviewReducer;
