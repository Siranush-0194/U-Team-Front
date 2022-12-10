import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PublicRoute, PrivateRoute } from "./routes";
import { useHistory } from 'react-router-dom';

import axios from "./axios";

// Init Store
import { Switch as AntSwitch, Space } from 'antd';

import './App.scss';

// i18n languages
import './i18n';
import { useTranslation } from 'react-i18next';

// Components
import Login from "./components/Login";

// Public
// import PageNotFound from "./pages/PageNotFound";

// Private
import Dashboard from "./pages/Dashboard/index";
import ResetPassword from './pages/Dashboard/Invitation/resetPass';

const App = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(function (state) {
    return state?.user;
  });

  useEffect(() => {
    axios.get("/user").then((response) => {
      let user = response?.data?.data || {};

      dispatch({
        type: 'login',
        payload: user
      });
    }).catch((response) => {
      if (response?.response?.status === 401) {
        dispatch({
          type: 'login',
          payload: {}
        });

        history.push("/");
      }
    });
  }, []);

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'am' ? 'en' : 'am');
  };

  return user === null ? <> </> : (
    <>
      {/* START PUBLIC ROUTES */}
      <PublicRoute exact path="/">
        <div className="App">
          <header>
            <div>Logo</div>

            <nav>
              Menu
            </nav>

            <Space direction="vertical">
              <AntSwitch checkedChildren="Eng" unCheckedChildren="հայ" defaultChecked onChange={changeLanguage} />
            </Space>
          </header>

          <section>
            <Login />
          </section>
        </div>
      </PublicRoute>

      <PublicRoute path="/accept/invitation">
        <ResetPassword />
      </PublicRoute>
      {/* END PUBLIC ROUTES */}

      {/* PRIVATE ROUTES */}
      <PrivateRoute path="/dashboard">
        <Dashboard />
      </PrivateRoute>
      {/* END PRIVATE ROUTES */}
    </>
  );
}

export default App;
