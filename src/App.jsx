import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PublicRoute, PrivateRoute } from "./routes";
import { useHistory } from "react-router-dom";
import useQuery from "./hooks/useQuery";

import axios from "./axios";

import "./App.scss";
import "./i18n";

// Components
import Login from "./components/Login";

// Public
// import PageNotFound from "./pages/PageNotFound";

// Private
import Dashboard from "./pages/Dashboard/index";
import ResetPassword from "./pages/Dashboard/Invitation/resetPass";
import AccountHeader from "./pages/Dashboard/Accounts/Dashboard/accountsHeader";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const query = useQuery();
  const [token] = useState(query.get("token"));

  const user = useSelector(function (state) {
    return state?.user;
  });

  useEffect(() => {
    !token &&
      axios
        .get("/user")
        .then((response) => {
          let user = response?.data || {};

          dispatch({
            type: "login",
            payload: user,
          });
        })
        .catch((response) => {
          if (response?.response?.status === 401) {
            dispatch({
              type: "login",
              payload: {},
            });

            history.push("/");
          }
        });
  }, []);

  return user === null ? (
    <>
      <PublicRoute path="/accept/invitation">
        <ResetPassword />
      </PublicRoute>
    </>
  ) : (
    <>
      {/* START PUBLIC ROUTES */}
      <PublicRoute exact path="/">
        <div className="App">
          <section>
            <Login />
          </section>
        </div>
      </PublicRoute>
      {/* END PUBLIC ROUTES */}

      {/* PRIVATE ROUTES */}
      <PrivateRoute path="/dashboard">
      <AccountHeader />

        <Dashboard />
      </PrivateRoute>
      {/* END PRIVATE ROUTES */}
    </>
  );
};

export default App;
