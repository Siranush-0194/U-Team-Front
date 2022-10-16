import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Login/context/AuthProvider';
import AdminDashboard from './AdminPage/Components/AdminDashboard';
import Institutes from './AdminPage/Components/Institutes';
import Login from './Login/api/LogIn';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <App /> */}
        <Routes>
        <Route index element={<App/>} />
      
        <Route path="/dashboard" element={<AdminDashboard/>}/>
        <Route path="/institutes" element={<Institutes/>}/>
        <Route path="/profile" element={<div>sdjnclksjcndkj</div>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);