const SET_PLANTS = "plants/SET_PLANTS";
const SET_PLANT = "plants/SET_PLANT";

const setPlants = (plants) => ({
    type: SET_PLANTS,
    payload: plants,
});

const setPlant = (plant) => ({
    type: SET_PLANT,
    payload: plant,
});

export const getPlants = () => async (dispatch) => {
    const response = await fetch("/api/plants");

    if (response.ok) {
        const data = await response.json();
        dispatch(setPlants(data.Plants));
    }
};

export const getPlant = (plantId) => async (dispatch) => {
    const response = await fetch(`/api/plants/${plantId}`);

    if (response.ok) {
      const plant = await response.json();
      dispatch(setPlant(plant));
    }
};

const initialState = {
    allPlants: [],
    currentPlant: {},
};

const plantsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_PLANTS:
        return {
          ...state,
          allPlants: action.payload,
        };
      case SET_PLANT:
        return {
          ...state,
          currentPlant: action.payload,
        };
      default:
        return state;
    }
  };

export default plantsReducer;
