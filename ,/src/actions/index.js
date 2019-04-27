import ActionType from "../constants/actionTypes";

export const toggleMenuActionCreator = () => {
  return {
    type: ActionType.TOGGLE_MENU
  };
};

export const fetchFlights = query => {
  return {
    type: ActionType.FETCH_FLIGHT_REQUESTED,
    payload: query
  };
};

export const fetchFlightsSucceeded = flights => {
  return {
    type: ActionType.FETCH_FLIGHT_SUCCEEDED,
    payload: flights
  };
};

export const fetchFlightsFailed = error => {
  return {
    type: ActionType.FETCH_FLIGHT_FAILED,
    payload: error
  };
};

export const loadPage = (page = 1) => {
  return {
    type: ActionType.LOAD_PAGE,
    payload: page
  };
};
