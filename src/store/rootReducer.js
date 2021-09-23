import { combineReducers } from "redux";
import statement from "./reducers/statement";
import user from "./reducers/user";
import sidebar from "./reducers/sidebar";
import dashboard from "./reducers/dashboard";
import auth from "./reducers/auth";
import message from "./reducers/message";
import file from "./reducers/file";

export default combineReducers({
  statement,
  user,
  sidebar,
  dashboard,
  auth,
  message,
  file,
});
