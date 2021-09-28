import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
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
  SEND_SMS_CODE_START,
  SEND_SMS_CODE_SUCCESS,
  SEND_SMS_CODE_FAILURE,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  CLEAR_SMS_TOKEN,
  GET_FILE_BY_ID_START,
  GET_FILE_BY_ID_SUCCESS,
  GET_FILE_BY_ID_FAILURE,
} from "../types";

export const clearSmsToken = () => {
  return {
    type: CLEAR_SMS_TOKEN,
  };
};

const authStart = () => {
  return {
    type: AUTH_START,
  };
};

const authSuccess = (data) => {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
};

const authFaulire = () => {
  return {
    type: AUTH_FAILURE,
  };
};

export const auth = () => {
  return async (dispatch) => {
    dispatch(authStart());

    const response = await fetch(`https://vq-server2.herokuapp.com/api/auth`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return dispatch(authFaulire());
    }

    dispatch(authSuccess(data));
  };
};

const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

const loginFaulire = (err) => {
  return {
    type: LOGIN_FAILURE,
    payload: err,
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    dispatch(loginStart());

    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/auth/login`,
      requestOptions
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return dispatch(loginFaulire(data.error));
    }

    dispatch(loginSuccess(data));
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

const unlockProfileStart = () => {
  return {
    type: UNLOCK_PROFILE_START,
  };
};

const unlockProfileSuccess = (user) => {
  return {
    type: UNLOCK_PROFILE_SUCCESS,
    payload: user,
  };
};

const unlockProfileFailure = (err) => {
  return {
    type: UNLOCK_PROFILE_FAILURE,
    payload: err,
  };
};

export const unlockProfile = (password) => {
  return async (dispatch) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ password }),
    };

    dispatch(unlockProfileStart());

    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/auth/unlock-profile`,
      requestOptions
    );

    const data = await response.json();
    if (!response.ok) {
      console.log(333);
      return dispatch(unlockProfileFailure(data.error));
    }

    dispatch(unlockProfileSuccess(data.user));
  };
};

const lockProfileStart = () => {
  return {
    type: LOCK_PROFILE_START,
  };
};

const lockProfileSuccess = (user) => {
  return {
    type: LOCK_PROFILE_SUCCESS,
    payload: user,
  };
};

const lockProfileFailure = (err) => {
  return {
    type: LOCK_PROFILE_FAILURE,
    payload: err,
  };
};

export const lockProfile = () => {
  return async (dispatch) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    dispatch(lockProfileStart());

    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/auth/lock-profile`,
      requestOptions
    );

    const data = await response.json();
    if (!response.ok) {
      return dispatch(lockProfileFailure(data.error));
    }

    dispatch(lockProfileSuccess(data.user));
  };
};

const verifySMSStart = () => {
  return {
    type: VERIFY_SMS_START,
  };
};

const verifySMSSuccess = (token) => {
  return {
    type: VERIFY_SMS_SUCCESS,
    payload: token,
  };
};

const verifySMSFailure = (err) => {
  return {
    type: VERIFY_SMS_FAILURE,
    payload: err,
  };
};

export const verifySMS = (fields) => {
  return async (dispatch) => {
    console.log("ABC", fields);
    let formData = new FormData();
    formData.append("name", fields.name);
    formData.append("recipient", fields.recipient);
    formData.append("email", fields.email);
    formData.append("address", fields.address);
    formData.append("leader", fields.leader);
    formData.append("theme", fields.theme);
    formData.append("message", fields.message);

    if (fields.files.length) {
      console.log(fields.files);
      for (let file of fields.files) {
        formData.append("files", file);
      }
    }

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    dispatch(verifySMSStart());

    const response = await fetch(
      `http://localhost:5000/api/sms/verify`,
      requestOptions
    );

    const data = await response.json();
    if (!response.ok) {
      return dispatch(verifySMSFailure(data.error));
    }

    dispatch(verifySMSSuccess(data));
  };
};

const sendSmsCodeStart = () => {
  return {
    type: SEND_SMS_CODE_START,
  };
};

const sendSmsCodeSuccess = () => {
  return {
    type: SEND_SMS_CODE_SUCCESS,
  };
};

const sendSmsCodeFailure = (error) => {
  return {
    type: SEND_SMS_CODE_FAILURE,
    payload: error,
  };
};

export const sendSmsCode = (smsCode, smsToken) => {
  return async (dispatch) => {
    dispatch(sendSmsCodeStart());

    const response = await fetch("http://localhost:5000/api/sms/send-code", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${smsToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ smsCode }),
    });

    const data = await response.json();

    if (!response.ok) {
      return dispatch(sendSmsCodeFailure(data.error));
    }

    dispatch(sendSmsCodeSuccess());
  };
};
