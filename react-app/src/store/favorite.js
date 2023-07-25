const GET_FAVORITES = "favorite/GET_FAVORITES";

const getFavorites = (favorites) => ({
    type: GET_FAVORITES,
    payload: favorites,
});

export const fetchFavorites = () => async(dispatch) => {

    const response = await fetch("/api/favorites/current")
    if(response.ok){
        const data = await response.json();
        console.log('IN THE THUNK OF FAVORITES', data)
        dispatch(getFavorites(data))
    }
}

const initialState = [];

const favoriteReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_FAVORITES:
            return action.payload;
        default:
        return state
    }
}

export default favoriteReducer;
