import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Main from "./Main";
import MainLayout from "./MainLayout";
import Spinner from "./Spinner";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token, loading, isAuth } = useSelector((state) => state.auth);


  if (loading) {
    return (
      <MainLayout>
        <Main>
          <Spinner />
        </Main>
      </MainLayout>
    );
  }

 
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth && user && user.role === "user" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
