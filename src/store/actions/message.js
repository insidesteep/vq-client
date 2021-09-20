import {
  GET_MESSAGES_START,
  GET_MESSAGES_FAILURE,
  GET_MESSAGES_SUCCESS,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
  GET_MY_MESSAGE_BY_ID_START,
  GET_MY_MESSAGE_BY_ID_SUCCESS,
  GET_MY_MESSAGE_BY_ID_FAILURE,
  NEW_MESSAGE_NOTIFICATION,
  SET_MSG_NOTIFICATIONS_FROM_LOCALSTORAGE,
} from "../types";

const sendMessageStart = () => {
  return {
    type: SEND_MESSAGE_START,
  };
};

const sendMessageSuccess = (data) => {
  return {
    type: SEND_MESSAGE_SUCCESS,
    payload: data,
  };
};

const sendMessageFailure = (error) => {
  return {
    type: SEND_MESSAGE_FAILURE,
    payload: error,
  };
};

export const sendMessage = ({ to, statementId, message }) => {
  return async (dispatch) => {
    dispatch(sendMessageStart());
    const response = await fetch(`/api/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        statementId,
        message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return dispatch(sendMessageFailure(data.error));
    }

    dispatch(sendMessageSuccess(data));
  };
};

const getMessagesStart = () => {
  return {
    type: GET_MESSAGES_START,
  };
};

const getMessagesSuccess = (data) => {
  return {
    type: GET_MESSAGES_SUCCESS,
    payload: data,
  };
};

const getMessagesFailure = (error) => {
  return {
    type: GET_MESSAGES_FAILURE,
    payload: error,
  };
};

export const getMessages = () => {
  return async (dispatch) => {
    dispatch(getMessagesStart());
    const response = await fetch(`/api/messages`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return dispatch(getMessagesFailure(data.error));
    }

    dispatch(getMessagesSuccess(data));
  };
};

const getMyMessageByIdStart = () => {
  return {
    type: GET_MY_MESSAGE_BY_ID_START,
  };
};

const getMyMessageByIdSuccess = (data, msgId) => {
  return {
    type: GET_MY_MESSAGE_BY_ID_SUCCESS,
    payload: {
      data,
      msgId,
    },
  };
};

const getMyMessageByIdFailure = (error) => {
  return {
    type: GET_MY_MESSAGE_BY_ID_FAILURE,
    payload: error,
  };
};

export const getMyMessageById = (id) => {
  return async (dispatch) => {
    dispatch(getMyMessageByIdStart());
    const response = await fetch(`/api/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return dispatch(getMyMessageByIdFailure(data.error));
    }

    dispatch(getMyMessageByIdSuccess(data, id));
  };
};

export const newMessageNotification = (newMessageData) => {
  if (localStorage.getItem("messages")) {
    const messages = JSON.parse(localStorage.getItem("messages"));
    messages.push(newMessageData);
    localStorage.setItem("messages", JSON.stringify(messages));
  } else {
    localStorage.setItem("messages", JSON.stringify([newMessageData]));
  }

  return {
    type: NEW_MESSAGE_NOTIFICATION,
    payload: newMessageData,
  };
};

export const setMsgNotificationFromLocalstorage = (data) => {
  return {
    type: SET_MSG_NOTIFICATIONS_FROM_LOCALSTORAGE,
    payload: data,
  };
};
