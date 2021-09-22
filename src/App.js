import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from "./views/Dashboard";
import StatementDetail from "./views/StatementDetail";
import Statements from "./views/Statements";
import {
  setNotificationFromLocalstorage,
  newStatementNotification,
} from "./store/actions/statement";
import {
  newMessageNotification,
  setMsgNotificationFromLocalstorage,
} from "./store/actions/message";
import { auth, logout } from "./store/actions/auth";
import Users from "./views/Users";
import UserInfo from "./views/UserInfo";
import LockScreen from "./views/LockScreen";
import Login from "./views/Login";
import LeaderPrivateRoute from "./components/layouts/LeaderPrivateRoute";
import PrivateRoute from "./components/layouts/PrivateRoute";
import UserProfile from "./views/UserProfile";
import MainPage from "./views/Main";
import SMSVerify from "./views/SmsVerify";
import Spinner from "./components/layouts/Spinner";
import MainLayout from "./components/layouts/MainLayout";
import Main from "./components/layouts/Main";
import Toast from "./components/Toast";

let socket = io("https://vq-server2.herokuapp.com");

function App() {
  const { user, isAuth, loading } = useSelector((state) => state.auth);
  const { successNotify } = useSelector((state) => state.statement);
  const dispatch = useDispatch();

  console.log(loading);
  useEffect(() => {
    dispatch(auth());

    if (localStorage.getItem("notifications")) {
      const notifications = JSON.parse(localStorage.getItem("notifications"));
      console.log(notifications);
      dispatch(setNotificationFromLocalstorage(notifications));
    }

    if (localStorage.getItem("messages")) {
      const messages = JSON.parse(localStorage.getItem("messages"));
      console.log(messages);
      dispatch(setMsgNotificationFromLocalstorage(messages));
    }
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit("user:connected", { phone: user.phone });

      socket.on("statement:new", (st) => {
        console.log("SYT", st);
        const audio = new Audio("http://gget.it/u1urz3zh/popsound.mp3");
        audio.play();
        console.log(audio);
        dispatch(newStatementNotification(st));
      });

      socket.on("message:new", (msg) => {
        const audio = new Audio("http://gget.it/u1urz3zh/popsound.mp3");
        audio.play();
        console.log(audio);
        dispatch(newMessageNotification(msg));
      });
    }
  }, [user]);

  return (
    <Router>
      {user && user.isLockProfile && <Redirect to="/dashboard/lock" />}
      {successNotify && (
        <Toast
          type="info"
          title="Новое уведомление"
          message="Пришло новое заявленее"
        />
      )}

      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/sms-verify" component={SMSVerify} />

        <PrivateRoute path="/profile" component={UserProfile} />

        <LeaderPrivateRoute exact path="/dashboard" component={Dashboard} />
        <LeaderPrivateRoute
          exact
          path="/dashboard/statements"
          component={Statements}
        />
        <LeaderPrivateRoute
          exact
          path="/dashboard/statements/:id"
          component={StatementDetail}
        />
        <LeaderPrivateRoute exact path="/dashboard/users" component={Users} />
        <LeaderPrivateRoute path="/dashboard/users/:id" component={UserInfo} />
        <LeaderPrivateRoute path="/dashboard/lock" component={LockScreen} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
