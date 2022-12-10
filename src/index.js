import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { Provider } from "react-redux";
import store from "./redux/store";

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <App />
            </Switch>
        </Router>
    </Provider>
);

reportWebVitals();
