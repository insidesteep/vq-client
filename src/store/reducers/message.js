import {
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
  GET_MY_MESSAGE_BY_ID_START,
  GET_MY_MESSAGE_BY_ID_SUCCESS,
  GET_MY_MESSAGE_BY_ID_FAILURE,
  CLEAR_MESSAGE_NOTIFICATION,
  SET_MESSAGE,
  GET_NEW_MESSAGES,
} from "../types";

const initialState = {
  data: [],
  newMessages: [],
  successNotify: false,
  message: null,
  loading: false,
  error: "",
  success: false,
};

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NEW_MESSAGES:
      return {
        ...state,
        newMessages: payload,
      };

    case CLEAR_MESSAGE_NOTIFICATION:
      return { ...state, successNotify: false };

    case SET_MESSAGE:
      return {
        ...state,
        successNotify: true,
        data: [payload, ...state.data],
        newMessages: [payload, ...state.newMessages],
      };
    case SEND_MESSAGE_START:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        success: true,
      };

    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
        success: true,
      };

    case GET_MESSAGES_START:
      return {
        ...state,
        loading: true,
        error: "",
        success: false,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: "",
      };
    case GET_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case GET_MY_MESSAGE_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_MY_MESSAGE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        message: payload.data,
        newMessages: state.newMessages.filter(msg => msg._id !== payload.id)
      };
    case GET_MY_MESSAGE_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
