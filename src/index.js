import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';

import { AuthProvider } from './Login/context/AuthProvider';
import AppNav from './AppNav';
import App from './App';




ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
    <AuthProvider>
      <App />
      {/* <AppNav/> */}  
     
      
      
    </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);