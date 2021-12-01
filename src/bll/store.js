import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { citiesReducer } from "./citiesReducer";


const rootReducer = combineReducers({
  citiesReducer,
});

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {};

export const store = createStore(rootReducer, persistedState, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});