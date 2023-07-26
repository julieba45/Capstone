const GET_FAVORITES = "favorite/GET_FAVORITES";
const GET_GARDEN_FAVORITES = "favorite/GET_GARDEN_FAVORITES"

const getFavorites = (favorites) => ({
    type: GET_FAVORITES,
    payload: favorites,
});

const getGardenFavorites = (favorites) => ({
    type: GET_GARDEN_FAVORITES,
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

export const fetchGardenFavorites = (gardenName) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${gardenName}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getGardenFavorites(data));
    }
};

const initialState = [];

const favoriteReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_FAVORITES:
            return action.payload;
        case GET_GARDEN_FAVORITES:
            return action.payload;
        default:
        return state
    }
}

export default favoriteReducer;
