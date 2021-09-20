import {
  GET_STATEMENTS_INFO_FAILURE,
  GET_STATEMENTS_INFO_START,
  GET_STATEMENTS_INFO_SUCCESS,
} from "../types";

const getStatementsInfoStart = () => {
  return {
    type: GET_STATEMENTS_INFO_START,
  };
};

const getStatementsInfoSuccess = (data) => {
  return {
    type: GET_STATEMENTS_INFO_SUCCESS,
    payload: data,
  };
};

const getStatementsInfoFailure = (error) => {
  return {
    type: GET_STATEMENTS_INFO_FAILURE,
    payload: error,
  };
};

export const getStatementsInfo = (params) => {
  return async (dispatch) => {
    dispatch(getStatementsInfoStart());
    const response = await fetch(
      `/api/dashboard/statements-info`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return dispatch(getStatementsInfoFailure(data.error));
    }

    dispatch(getStatementsInfoSuccess(data));
  };
};
