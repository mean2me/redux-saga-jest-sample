import { combineReducers } from 'redux';
import fetchFlightsReducer from './flightReducer';

export default combineReducers({
    flights:fetchFlightsReducer
});