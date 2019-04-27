import { put, take, call, fork, takeEvery } from 'redux-saga/effects';
import SearchClient from '../services/SearchClient';
import ActionType from '../constants/actionTypes';

export function* searchFlights(action) {
    try {
        const flights = yield call((SearchClient.search), action.payload);
        yield put({type: ActionType.FETCH_FLIGHT_SUCCEEDED, result: flights});
    } catch(e) {
        yield put({type: ActionType.FETCH_FLIGHT_FAILED, error: e});
    }
}

export default function* searchFlightSaga() {
    while(true) {
        const action = yield take(ActionType.FETCH_FLIGHT_REQUESTED);
        yield fork(searchFlights,action);
    }
}