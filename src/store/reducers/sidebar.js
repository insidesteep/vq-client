import { TOGGLE_SIDEBAR } from "../types";

const initialState = {
  isShow: true,
};

const sidebarReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isShow: !state.isShow };
    default:
      return state;
  }
};

export default sidebarReducer;
