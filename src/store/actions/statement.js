import {
  CHANGE_STATEMENT,
  CLEAR_STATEMENT_NOTIFICATION,
  CREATE_STATEMENT_FAILURE,
  CREATE_STATEMENT_START,
  CREATE_STATEMENT_SUCCESS,
  GET_ALL_STATEMENTS_FAILURE,
  GET_ALL_STATEMENTS_START,
  GET_ALL_STATEMENTS_SUCCESS,
  GET_MY_STATEMENTS_FAILURE,
  GET_MY_STATEMENTS_START,
  GET_MY_STATEMENTS_SUCCESS,
  GET_MY_STATEMENT_BY_ID_FAILURE,
  GET_MY_STATEMENT_BY_ID_START,
  GET_MY_STATEMENT_BY_ID_SUCCESS,
  GET_NEW_STATEMENTS,
  GET_STATEMENT_BY_ID_FAILURE,
  GET_STATEMENT_BY_ID_START,
  GET_STATEMENT_BY_ID_SUCCESS,
  SET_STATEMENT,
} from "../types";

export const getNewStatements = () => {
  return async (dispatch) => {
    const response = await fetch(`https://vq-server2.herokuapp.com/api/statements/new`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return console.error(data.error);
    }

    dispatch({ type: GET_NEW_STATEMENTS, payload: data });
  };
};

export const clearStatementNotification = () => {
  return {
    type: CLEAR_STATEMENT_NOTIFICATION,
  };
};

export const changeStatement = () => {
  return {
    type: CHANGE_STATEMENT,
  };
};

const getAllStatementsStart = () => {
  return {
    type: GET_ALL_STATEMENTS_START,
  };
};

const getAllStatementsSuccess = (data) => {
  return {
    type: GET_ALL_STATEMENTS_SUCCESS,
    payload: data,
  };
};

const getAllStatementsFailure = (error) => {
  return {
    type: GET_ALL_STATEMENTS_FAILURE,
    payload: error,
  };
};

export const getAllStatements = (params) => {
  const { sortBy, order, limit, filter, currentPage } = params;

  return async (dispatch) => {
    dispatch(getAllStatementsStart());
    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/statements?sortBy=${sortBy}&order=${order}&limit=${limit}&filter=${filter}&page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return dispatch(getAllStatementsFailure(data.error));
    }

    dispatch(getAllStatementsSuccess(data));
  };
};

const getStatementByIdStart = () => {
  return {
    type: GET_STATEMENT_BY_ID_START,
  };
};

const getStatementByIdSuccess = (data, id) => {
  return {
    type: GET_STATEMENT_BY_ID_SUCCESS,
    payload: {
      data,
      id,
    },
  };
};

const getStatementByIdFailure = (error) => {
  return {
    type: GET_STATEMENT_BY_ID_FAILURE,
    payload: error,
  };
};

export const getStatementById = (id) => {
  return async (dispatch) => {
    dispatch(getStatementByIdStart());
    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/statements/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return dispatch(getStatementByIdFailure(data.error));
    }

    dispatch(getStatementByIdSuccess(data.statement, id));
  };
};

export const setStatement = (newStatementData) => {
  return {
    type: SET_STATEMENT,
    payload: newStatementData,
  };
};

const createStatementStart = () => {
  return {
    type: CREATE_STATEMENT_START,
  };
};

const createStatementSuccess = (data) => {
  return {
    type: CREATE_STATEMENT_SUCCESS,
    payload: data,
  };
};

const createStatementFailure = (error) => {
  return {
    type: CREATE_STATEMENT_FAILURE,
    payload: error,
  };
};

export const createStatement = ({ leader, theme, message, files }) => {
  return async (dispatch) => {
    dispatch(createStatementStart());

    const formData = new FormData();
    formData.append("leader", leader);
    formData.append("theme", theme);
    formData.append("message", message);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    const response = await fetch(
      "https://vq-server2.herokuapp.com/api/statements/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return dispatch(createStatementFailure(data.error));
    }

    dispatch(createStatementSuccess(data));
  };
};

const getMyStatementByIdStart = () => {
  return {
    type: GET_MY_STATEMENT_BY_ID_START,
  };
};

const getMyStatementByIdSuccess = (data) => {
  return {
    type: GET_MY_STATEMENT_BY_ID_SUCCESS,
    payload: data,
  };
};

const getMyStatementByIdFailure = (error) => {
  return {
    type: GET_MY_STATEMENT_BY_ID_FAILURE,
    payload: error,
  };
};

export const getMyStatementById = (id) => {
  return async (dispatch) => {
    dispatch(getMyStatementByIdStart());

    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/statements/my/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return dispatch(getMyStatementByIdFailure(data.error));
    }

    dispatch(getMyStatementByIdSuccess(data));
  };
};

const getMyStatementsStart = () => {
  return {
    type: GET_MY_STATEMENTS_START,
  };
};

const getMyStatementsSuccess = (data) => {
  return {
    type: GET_MY_STATEMENTS_SUCCESS,
    payload: data,
  };
};

const getMyStatementsFailure = (error) => {
  return {
    type: GET_MY_STATEMENTS_FAILURE,
    payload: error,
  };
};

export const getMyStatements = (id) => {
  return async (dispatch) => {
    dispatch(getMyStatementsStart());

    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/statements/my`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return dispatch(getMyStatementsFailure(data.error));
    }

    dispatch(getMyStatementsSuccess(data));
  };
};
