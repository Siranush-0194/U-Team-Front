import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { PublicRoute, PrivateRoute } from "./routes";

import { Provider } from "react-redux";

// Init Store
import store from "./redux/store";

// Public
import PageNotFound from "./pages/PageNotFound";

// Private
import Dashboard from "./pages/auth/Dashboard/index";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          {/* PUBLIC ROUTES */}
          <PublicRoute exact path="/">
            <App />
          </PublicRoute>

          {/* PRIVATE ROUTES */}
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
