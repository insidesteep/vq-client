import { GET_FILE_BY_ID_SUCCESS, GET_FILE_BY_ID_FAILURE } from "../types";

const initialState = {
  error: "",
};

const fileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FILE_BY_ID_SUCCESS:
      return {
        ...state,
        error: "",
      };
    case GET_FILE_BY_ID_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default fileReducer;
