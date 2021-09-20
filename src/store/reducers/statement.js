import {
  CHANGE_STATEMENT,
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
  GET_STATEMENT_BY_ID_FAILURE,
  GET_STATEMENT_BY_ID_START,
  GET_STATEMENT_BY_ID_SUCCESS,
  NEW_STATEMENT_NOTIFICATION,
  SET_NOTIFICATIONS_FROM_LOCALSTORAGE,
} from "../types";

const initialState = {
  data: [],
  size: 0,
  statement: null,
  notificationData: [],
  successNotify: false,
  loading: false,
  error: "",
  tokenForSmsCode: null,
};

const statementReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_STATEMENT:
      return {
        ...state,
        statement: {
          ...state.statement,
          status: "completed",
        },
      };

    case NEW_STATEMENT_NOTIFICATION:
      return {
        ...state,
        successNotify: true,
        notificationData: [...state.notificationData, payload],
        data: [payload, ...state.data],
      };

    case SET_NOTIFICATIONS_FROM_LOCALSTORAGE:
      return {
        ...state,
        notificationData: payload,
        size: state.size + 1,
      };

    case GET_STATEMENT_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case GET_STATEMENT_BY_ID_SUCCESS:
      if (localStorage.getItem("notifications")) {
        const nts = JSON.parse(localStorage.getItem("notifications"));

        const filtred = nts.filter((n) => n._id != payload.stId);
        localStorage.setItem("notifications", JSON.stringify(filtred));
      }

      const notifications = state.notificationData.filter(
        (nt) => nt._id != payload.stId
      );

      return {
        ...state,
        loading: false,
        error: "",
        statement: payload.data,
        notificationData: notifications,
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
        error: "",
      };

    case CREATE_STATEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: "",
      };

    case CREATE_STATEMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
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
