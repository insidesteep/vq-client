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

const initialState = {
  data: [],
  newStatements: [],
  size: 0,
  statement: null,
  successNotify: false,
  loading: false,
  error: "",
  tokenForSmsCode: null,
};

const statementReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NEW_STATEMENTS:
      return {
        ...state,
        newStatements: payload,
      };

    case CLEAR_STATEMENT_NOTIFICATION:
      return { ...state, successNotify: false };
    case CHANGE_STATEMENT:
      return {
        ...state,
        statement: {
          ...state.statement,
          status: "completed",
        },
      };

    case SET_STATEMENT:
      return {
        ...state,
        successNotify: true,
        data: [payload, ...state.data],
        newStatements: [payload, ...state.newStatements],
      };

    case GET_STATEMENT_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case GET_STATEMENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        statement: payload.data,
        newStatements: state.newStatements.filter(
          (st) => st._id !== payload.id
        ),
      };

    case GET_STATEMENT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case GET_ALL_STATEMENTS_START:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case GET_ALL_STATEMENTS_SUCCESS:
      return {
        ...state,
        data: payload.statements,
        size: payload.size,
        loading: false,
        error: "",
      };

    case GET_ALL_STATEMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CREATE_STATEMENT_START:
      return {
        ...state,
        loading: true,
        success: false,
        successNotify: false,
        error: "",
      };

    case CREATE_STATEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        successNotify: true,
        error: "",
      };

    case CREATE_STATEMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
        successNotify: false,
      };

    case GET_MY_STATEMENT_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_MY_STATEMENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        statement: payload,
      };

    case GET_MY_STATEMENT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        statement: null,
        error: payload,
      };

    case GET_MY_STATEMENTS_START:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_MY_STATEMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        data: payload,
      };

    case GET_MY_STATEMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default statementReducer;
