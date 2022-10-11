import React from 'react';
import ReactDOM from 'react-dom';
import './login.css';
import { AuthProvider } from './Login/context/AuthProvider';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);