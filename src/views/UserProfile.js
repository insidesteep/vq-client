import moment from "moment";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Switch, useHistory } from "react-router-dom";

import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Main from "../components/layouts/Main";
import MainLayout from "../components/layouts/MainLayout";
import Nav from "../components/layouts/Nav";
import Spinner from "../components/layouts/Spinner";
import CreateStatementForm from "../components/User/CreateStatementForm";
import SentDetail from "../components/User/SentDetail";
import UserInbox from "../components/User/UserInbox";
import UserMain from "../components/User/UserMain";
import UserNav from "../components/User/UserNav";
import UserSent from "../components/User/UserSent";
import UserViewMessage from "../components/User/UserViewMessage";
import { getStatementsInfo } from "../store/actions/dashboard";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <MainLayout>
      <Nav />
      <Header />
      <div
        className="content-body user-profile"
        style={{
          height: "100vh",
        }}
      >
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <UserMain user={user} />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <UserNav />
                  <div className="email-right-box">
                    <Switch>
                      <Route
                        path="/profile/new-statement"
                        component={CreateStatementForm}
                      />
                      <Route
                        exact
                        path="/profile/inbox"
                        component={UserInbox}
                      />
                      <Route
                        path="/profile/inbox/:id"
                        component={UserViewMessage}
                      />
                      <Route
                        exact
                        path="/profile"
                        render={(props) => <UserSent {...props} user={user} />}
                      />
                      <Route
                        path="/profile/:id"
                        render={(props) => <SentDetail {...props} />}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </MainLayout>
  );
};

export default UserProfile;
