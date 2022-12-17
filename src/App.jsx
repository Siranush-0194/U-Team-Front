import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PublicRoute, PrivateRoute } from "./routes";
import { useHistory } from 'react-router-dom';
import useQuery from './hooks/useQuery';

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

  const query = useQuery();
  const [token] = useState(query.get('token'));

  const user = useSelector(function (state) {
    return state?.user;
  });

  useEffect(() => {
    !token && axios.get("/user").then((response) => {
      let user = response?.data?.data || {};

      dispatch({
        type: 'login',
        payload: user
      });
    }).catch((response) => {
      // console.log(response);
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

  return user === null ? <>
    <PublicRoute path="/accept/invitation">
      <ResetPassword />
    </PublicRoute>
  </> : (
    <>
      {/* START PUBLIC ROUTES */}
      <PublicRoute exact path="/">
        <div className="App">
          <header>
            <Space direction="vertical">
              <AntSwitch className='switcher' checkedChildren="Eng" unCheckedChildren="հայ" defaultChecked onChange={changeLanguage} />
            </Space>
          </header>

          <section>
            <Login />
          </section>
        </div>
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
