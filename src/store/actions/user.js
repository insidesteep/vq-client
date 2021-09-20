import {
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_START,
  GET_ALL_USERS_SUCCESS,
  GET_LEADERS_FAILURE,
  GET_LEADERS_START,
  GET_LEADERS_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_START,
  GET_USER_BY_ID_SUCCESS,
} from "../types";

//   const getAllUsersStart = () => {
//     return {
//       type: GET_ALL_USERS_START,
//     };
//   };

//   const getAllUsersSuccess = (data) => {
//     return {
//       type: GET_ALL_USERS_SUCCESS,
//       payload: data,
//     };
//   };

//   const getAllUsersFailure = (error) => {
//     return {
//       type: GET_ALL_USERS_FAILURE,
//       payload: error,
//     };
//   };

//   export const getAllUsers = (params) => {
//     const { sortBy, order, limit, filter, currentPage} =
//       params;

//     return async (dispatch) => {
//       dispatch(getAllUsersStart());
//       const response = await fetch(
//         `https://vq-server2.herokuapp.com/api/statements?sortBy=${sortBy}&order=${order}&limit=${limit}&filter=${filter}&page=${currentPage}`
//       );

//       const data = await response.json();
//       console.log(data);

//       if (!response.ok) {
//         return dispatch(getAllUsersFailure(data.error));
//       }

//       dispatch(getAllUsersSuccess(data));
//     };
//   };

const getUserByIdStart = () => {
  return {
    type: GET_USER_BY_ID_START,
  };
};

const getUserByIdSuccess = (data) => {
  return {
    type: GET_USER_BY_ID_SUCCESS,
    payload: data,
  };
};

const getUserByIdFailure = (error) => {
  return {
    type: GET_USER_BY_ID_FAILURE,
    payload: error,
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    dispatch(getUserByIdStart());
    const response = await fetch(`https://vq-server2.herokuapp.com/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return dispatch(getUserByIdFailure(data.error));
    }

    dispatch(getUserByIdSuccess(data.user));
  };
};

const getAllUsersStart = () => {
  return {
    type: GET_ALL_USERS_START,
  };
};

const getAllUsersSuccess = (data) => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: data,
  };
};

const getAllUsersFailure = (error) => {
  return {
    type: GET_ALL_USERS_FAILURE,
    payload: error,
  };
};

export const getAllUsers = (params) => {
  const { sortBy, order, limit, filter, currentPage } = params;

  console.log("GET_ALL_USERS", params);
  return async (dispatch) => {
    dispatch(getAllUsersStart());

    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/users?sortBy=${sortBy}&order=${order}&limit=${limit}&filter=${filter}&page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    console.log("USERS", data);

    if (!response.ok) {
      return dispatch(getAllUsersFailure(data.error));
    }

    dispatch(getAllUsersSuccess(data));
  };
};

const getLeadersStart = () => {
  return {
    type: GET_LEADERS_START,
  };
};

const getLeadersSuccess = (data) => {
  return {
    type: GET_LEADERS_SUCCESS,
    payload: data,
  };
};

const getLeadersFailure = (error) => {
  return {
    type: GET_LEADERS_FAILURE,
    payload: error,
  };
};

export const getLeaders = () => {
  return async (dispatch) => {
    dispatch(getLeadersStart());

    const response = await fetch(`https://vq-server2.herokuapp.com/api/users/leaders`);

    const data = await response.json();
    if (!response.ok) {
      return dispatch(getLeadersFailure(data.error));
    }

    dispatch(getLeadersSuccess(data.leaders));
  };
};
