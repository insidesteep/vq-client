import {
  GET_STATEMENTS_INFO_FAILURE,
  GET_STATEMENTS_INFO_START,
  GET_STATEMENTS_INFO_SUCCESS,
} from "../types";

const initialState = {
  statementsInfo: null,
  loading: false,
  error: "",
};

const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_STATEMENTS_INFO_START:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case GET_STATEMENTS_INFO_SUCCESS:
      return {
        ...state,
        statementsInfo: payload,
        loading: false,
        error: "",
      };

    case GET_STATEMENTS_INFO_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
