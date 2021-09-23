import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  UNLOCK_PROFILE_START,
  UNLOCK_PROFILE_SUCCESS,
  UNLOCK_PROFILE_FAILURE,
  LOCK_PROFILE_START,
  LOCK_PROFILE_SUCCESS,
  LOCK_PROFILE_FAILURE,
  VERIFY_SMS_START,
  VERIFY_SMS_SUCCESS,
  VERIFY_SMS_FAILURE,
  SET_SMS_TOKEN,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  SEND_MESSAGE_START,
  SEND_SMS_CODE_START,
  SEND_SMS_CODE_SUCCESS,
  SEND_SMS_CODE_FAILURE,
  CLEAR_SMS_TOKEN,
} from "../types";

const initialState = {
  user: null,
  token: null,
  isAuth: false,
  loggedIn: false,
  loading: true,
  smsCodeError: "",
  smsLoading: false,
  error: "",
  smsVerify: { smsToken: null, recipient: null },
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_SMS_TOKEN:
      return {
        ...state,
        smsCodeError: "",
        smsLoading: false,
        smsVerify: { smsToken: null, recipient: null },
      };
    case SEND_SMS_CODE_START:
      return {
        ...state,
        smsLoading: true,
        smsCodeError: "",
      };

    case SEND_SMS_CODE_SUCCESS:
      return {
        ...state,
        smsLoading: false,
        smsVerify: { smsToken: null, recipient: null },
        smsCodeError: "",
      };

    case SEND_SMS_CODE_FAILURE:
      return {
        ...state,
        smsLoading: false,
        smsCodeError: payload,
      };

    case AUTH_START:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case AUTH_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);

      return {
        ...state,
        loggedIn: true,
        isLock: false,
        user: payload.user,
        token: payload.token,
        loading: false,
        isAuth: true,
        error: "",
      };
    case AUTH_FAILURE:
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return {
        user: null,
        token: null,
        loggedIn: false,
        loading: false,
        error: "",
        isAuth: false,
        smsVerify: { smsToken: null, recipient: null },
      };
    case LOGIN_START:
      return {
        ...state,
        user: payload,
        loading: true,
        error: "",
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);

      return {
        ...state,
        loggedIn: true,
        isLock: false,
        user: payload.user,
        token: payload.token,
        loading: false,
        isAuth: true,
        error: "",
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        loggedIn: false,
        loading: false,
        error: payload,
        isAuth: false,
        smsVerify: { smsToken: null, recipient: null },
      };
    case LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("smsToken");

      return {
        user: null,
        token: null,
        loggedIn: false,
        isLock: false,
        loading: false,
        error: "",
        isAuth: false,
      };

    case LOCK_PROFILE_START:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case LOCK_PROFILE_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));

      return {
        ...state,
        loading: false,
        user: payload,
        error: "",
      };

    case LOCK_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case UNLOCK_PROFILE_START:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case UNLOCK_PROFILE_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));

      return {
        ...state,
        loading: false,
        user: payload,
        error: "",
      };

    case UNLOCK_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case VERIFY_SMS_START:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case VERIFY_SMS_SUCCESS:
      return {
        ...state,
        loading: false,
        smsVerify: {
          ...payload,
        },
        error: "",
      };

    case VERIFY_SMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
