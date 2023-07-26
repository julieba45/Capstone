const GET_FAVORITES = "favorite/GET_FAVORITES";
const GET_GARDEN_FAVORITES = "favorite/GET_GARDEN_FAVORITES";
const UPDATE_FAVORITE = 'favorite/UPDATE_FAVORITE';
const ADD_FAVORITE = 'favorite/ADD_FAVORITE';

const getFavorites = (favorites) => ({
    type: GET_FAVORITES,
    payload: favorites,
});

const getGardenFavorites = (favorites) => ({
    type: GET_GARDEN_FAVORITES,
    payload: favorites,
});

const updateFavorite = (favorite) => ({
    type: UPDATE_FAVORITE,
    payload: favorite
});

const addFavorite = (favorite) => ({
    type: ADD_FAVORITE,
    payload: favorite
})

export const fetchFavorites = () => async(dispatch) => {

    const response = await fetch("/api/favorites/current")
    if(response.ok){
        const data = await response.json();
        // console.log('IN THE THUNK OF FAVORITES', data)
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

export const updateFavoritePlant = (favoriteId, newGardenName) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ gardenName: newGardenName })
    });

    if (response.ok) {
      const updatedFavorite = await response.json();
      dispatch(updateFavorite(updatedFavorite));
    }
};

export const addFavoritePlant = (plantId, gardenName, position) => async(dispatch) => {
    console.log('--------FAILED BODY HERE',JSON.stringify({
        id: plantId,
        gardenName:gardenName,
        position: position
    }) )
    const response = await fetch(`/api/favorites`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: plantId,
            gardenName:gardenName,
            position: position
        })
    });
    if(response.ok){
        const addedFavorite = await response.json();
        dispatch(addFavorite(addedFavorite))
    }
}

const initialState = [];

const favoriteReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_FAVORITES:
            return action.payload;
        case GET_GARDEN_FAVORITES:
            return action.payload;
        case ADD_FAVORITE:
            return [...state, action.payload]
        case UPDATE_FAVORITE:
            return state.map(favorite => favorite.id === action.payload.id ? action.payload : favorite)
        default:
            return state
    }
}

export default favoriteReducer;
