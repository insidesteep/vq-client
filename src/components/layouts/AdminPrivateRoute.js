import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.role === "admin" && token ? (
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

export default AdminPrivateRoute;
