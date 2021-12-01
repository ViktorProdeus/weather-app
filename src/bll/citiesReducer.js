import { weatherAPI } from "../dall/weatherApi";

const initialState = {
    cities: [],
    checked: false,
};


const ADD_CITY = "cities/ADD_CITY";
const REMOVE_CITY = "cities/REMOVE_CITY";
const UPDATE_DATA = "cities/UPDATE_DATA";
const CHANGE_CHECKED = "cities/CHANGE_CHECKED";

export const citiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CITY: {
            return {
                ...state,
                cities: [action.data, ...state.cities]
            }
        }

        case REMOVE_CITY: {
            let newCities = state.cities.filter(city => city.id !== action.id);

            return {
                ...state,
                cities: newCities
            };
        }

        case UPDATE_DATA: {
            const updateCities = state.cities.map((city) => city.id === action.data.id ? {...action.data} : city);

            return {
                ...state,
                cities: updateCities
            }
        }

        case CHANGE_CHECKED: {

            return {
                ...state,
                checked: action.checked
            }
        }

        default:
            return state
    }

}

// actions
export const addCity = (data) => ({
    type: ADD_CITY,
    data,
});

export const removeCity = (data) => ({
    type: REMOVE_CITY,
    id: data.id,
});

export const updateData = (data) => ({
    type: UPDATE_DATA,
    data,
});

export const changeChecked = (checked) => ({
    type: CHANGE_CHECKED,
    checked,
});

// thunks
export const addToList = (cities, city, setMessage, resetField) => {
    return async (dispatch) => {
        try {
            const newData = await weatherAPI.get(city);
            const isCityInList = cities.some((c) => c.id === newData.id);

            isCityInList ? setMessage("этот город уже добавлен в список") : dispatch(addCity(newData));
            !isCityInList && resetField()

        } catch (e) {
            if (e.response) {
                setMessage("город не найден");
            } else {
                setMessage(e.message)
            }
        }
    }
}

export const updateCity = (city, setMessage) => {
    return async (dispatch) => {
        try {
            const newData = await weatherAPI.get(city);

            dispatch(updateData(newData))

        } catch (e) {
            if (e.response) {
                setMessage(e.response.data.message);
            } else {
                setMessage(e.message)
            }
        }
    }
}
