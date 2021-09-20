import {
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_START,
  GET_ALL_USERS_SUCCESS,
  GET_LEADERS_FAILURE,
  GET_LEADERS_START,
  GET_LEADERS_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_START,
  GET_USER_BY_ID_SUCCESS,
} from "../types";

const initialState = {
  data: [],
  user: null,
  leaders: [],
  size: 0,
  loading: false,
  error: "",
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: "",
      };

    case GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case GET_ALL_USERS_START:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        data: payload.clients,
        size: payload.size,
        loading: false,
        error: "",
      };

    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case GET_LEADERS_START:
      return { ...state };

    case GET_LEADERS_SUCCESS:
      return {
        ...state,
        leaders: payload,
      };

    case GET_LEADERS_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;
