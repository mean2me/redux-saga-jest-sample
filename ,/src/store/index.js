import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import searchFlightSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(searchFlightSaga);

export default store;