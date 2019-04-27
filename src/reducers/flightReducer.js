import ActionType from '../constants/actionTypes';

const initialState = {
    running:false,
    results:[],
    summary:{},
    error:false
};

export default (state=initialState, action) => {

    switch(action.type) {
        case ActionType.FETCH_FLIGHT_REQUESTED:
            state.running = true;
            break;
        case ActionType.FETCH_FLIGHT_SUCCEEDED:
            state.results = action.result.itineraries;
            state.summary = action.result.summary;
            state.running = false;
            state.error = false;
            break;
        case ActionType.FETCH_FLIGHT_FAILED:
            state.results = [];
            state.error = action.error;
            state.running = false;
            break;
        default:
            state.running = false;
            return state;
    }
    return {...state};
}