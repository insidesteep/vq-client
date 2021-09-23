import { GET_FILE_BY_ID_SUCCESS, GET_FILE_BY_ID_FAILURE } from "../types";

const getFileByIdSuccess = () => {
  return {
    type: GET_FILE_BY_ID_SUCCESS,
  };
};

const getFileByIdFailure = (error) => {
  return {
    type: GET_FILE_BY_ID_FAILURE,
    payload: error,
  };
};

export const getFileById = (fileID) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://vq-server2.herokuapp.com/api/files/download/${fileID}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.originalName;
      // document.appendChild(link);
      link.click();
      link.remove();
    }

    const data = await response.json();

    if (!response.ok) {
      return dispatch(getFileByIdFailure(data.error));
    }

    dispatch(getFileByIdSuccess());
  };
};
