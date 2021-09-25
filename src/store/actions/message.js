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
  CLEAR_MESSAGE_NOTIFICATION,
  SET_MESSAGE,
  GET_NEW_MESSAGES,
} from "../types";

export const getNewMessages = () => {
  return async (dispatch) => {
    const response = await fetch(`https://vq-server2.herokuapp.com/api/messages/new`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return console.error(data.error);
    }

    dispatch({ type: GET_NEW_MESSAGES, payload: data });
  };
};

export const clearMessageNotification = () => {
  return {
    type: CLEAR_MESSAGE_NOTIFICATION,
  };
};

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
    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/messages/send`,
      {
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
      }
    );

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
    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/messages`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

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

const getMyMessageByIdSuccess = (data, id) => {
  return {
    type: GET_MY_MESSAGE_BY_ID_SUCCESS,
    payload: {
      data,
      id,
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
    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/messages/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return dispatch(getMyMessageByIdFailure(data.error));
    }

    dispatch(getMyMessageByIdSuccess(data, id));
  };
};

export const setMessage = (newMessageData) => {
  return {
    type: SET_MESSAGE,
    payload: newMessageData,
  };
};
