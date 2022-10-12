import React from 'react';
import ReactDOM from 'react-dom';


import { AuthProvider } from './Login/context/AuthProvider';
// import AppNav from './AppNav';
import App from './App';




ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      {/* <AppNav/> */}
      
     
      
      
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);