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
  NEW_MESSAGE_NOTIFICATION,
  SET_MSG_NOTIFICATIONS_FROM_LOCALSTORAGE,
} from "../types";

const initialState = {
  data: [],
  msgNotificationData: [],
  successNotify: fasle,
  message: null,
  loading: false,
  error: "",
  success: false,
};

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MSG_NOTIFICATIONS_FROM_LOCALSTORAGE:
      return {
        ...state,
        msgNotificationData: payload,
      };

    case NEW_MESSAGE_NOTIFICATION:
      return {
        ...state,
        successNotify: true,
        msgNotificationData: [...state.msgNotificationData, payload],
        data: [payload, ...state.data],
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
      if (localStorage.getItem("messages")) {
        const msgs = JSON.parse(localStorage.getItem("messages"));

        const filtred = msgs.filter((m) => m._id != payload.msgId);
        localStorage.setItem("messages", JSON.stringify(filtred));
      }

      const messages = state.msgNotificationData.filter(
        (msg) => msg._id != payload.msgId
      );

      return {
        ...state,
        loading: false,
        error: "",
        message: payload.data,
        msgNotificationData: messages,
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
