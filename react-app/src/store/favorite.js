const GET_FAVORITES = "favorite/GET_FAVORITES";
const GET_GARDEN_FAVORITES = "favorite/GET_GARDEN_FAVORITES";
const UPDATE_FAVORITE = 'favorite/UPDATE_FAVORITE';
const UPDATE_GARDEN_NAME = 'favorite/UPDATE_GARDEN_NAME';
const ADD_FAVORITE = 'favorite/ADD_FAVORITE';
const DELETE_FAVORITE = 'favorite/DELETE_FAVORITE';


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

const updateGardenName = (oldGardenName, updatedFavorites) => ({
    type: UPDATE_GARDEN_NAME,
    payload: {
        oldGardenName,
        updatedFavorites
    }
});

const addFavorite = (favorite) => ({
    type: ADD_FAVORITE,
    payload: favorite
})

const deleteFavorite = (favoriteId) => ({
    type: DELETE_FAVORITE,
    payload: favoriteId
});


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

export const updateGarden = (oldGardenName, newGardenName) => async (dispatch) => {
    // console.log("---------API", `/api/favorite/${oldGardenName}`)
    // console.log("-------------BODY", JSON.stringify({ newGardenName }))
    const response = await fetch(`/api/favorites/${oldGardenName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newGardenName }),
    });

    if (response.ok) {
        const updatedFavorites = await response.json();
        dispatch(updateGardenName(oldGardenName, updatedFavorites));
    }
};

export const addFavoritePlant = (plantId, gardenName, position) => async(dispatch) => {
    // console.log('--------FAILED BODY HERE',JSON.stringify({
    //     id: plantId,
    //     gardenName:gardenName,
    //     position: position
    // }) )
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

export const deleteFavoritePlant = (favoriteId) => async(dispatch) => {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(deleteFavorite(favoriteId))
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
        case UPDATE_GARDEN_NAME:
            const newState = state.filter(favorite => favorite.gardenName !== action.payload.oldGardenName);
            return [...newState, ...action.payload.updatedFavorites];
        case DELETE_FAVORITE:
            return state.filter(favorite => favorite.id !== action.payload);
        default:
            return state
    }
}

export default favoriteReducer;
