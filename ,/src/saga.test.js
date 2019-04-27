import { runSaga } from 'redux-saga';
import SearchClient from "./services/SearchClient";
import * as Actions from './actions';
import searchFlightSaga, { searchFlights } from './sagas';
import store from './store';
import ActionTypes from "./constants/actionTypes";

jest.mock('./services/SearchClient');

describe("Search flights saga", () => {

    it("it should call SearchClient.search() method", async () => {

      SearchClient.search = jest.fn().mockImplementation(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { result: {itineraries: [{value:"success"}], query: {}, summary: {} }};
      });

      store.dispatch(Actions.fetchFlights({}));

      expect(SearchClient.search).toHaveBeenCalled();

    });

    it("should dispatch FETCH_FLIGHT_SUCCEEDED on success", async () => {

      const dispatched = [];

      SearchClient.search = jest.fn().mockResolvedValueOnce({itineraries: [],query:{},summary:{}});

      const fakeStore = {
        getState:() => ({flights:{itineraries: [],query:{},summary:{}}}),
        dispatch:(action) => dispatched.push(action)
      };

      await runSaga(
          fakeStore,
          searchFlights,
          {payload:{}}
      ).done;

      expect(dispatched.pop().type).toBe(ActionTypes.FETCH_FLIGHT_SUCCEEDED);

    });

    it("should dispatch FETCH_FLIGHT_FAILED action on error", async () => {

      SearchClient.search = jest.fn().mockRejectedValueOnce(new Error('Async error'));

      const dispatched = [];

      const fakeStore = {
        getState:() => ({flights:{itineraries: [],query:{},summary:{}}}),
        dispatch:(action) => dispatched.push(action)
      };

      await runSaga(
          fakeStore,
          searchFlights,
          {payload:{}}
      ).done;

      expect(dispatched.pop().type).toBe(ActionTypes.FETCH_FLIGHT_FAILED);

    });
});
