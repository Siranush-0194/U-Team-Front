import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AdminPage/Login/context/AuthProvider';

import AdminDashboard from './AdminPage/Components/AdminDashboard';
import Institutes from './AdminPage/Components/Institutes';
import Login from './AdminPage/Login/api/LogIn';
import App from './App';
import StudPage from './StudentPage/Posts/StudPage';
import StudLogin from './StudentPage/StudLogin';
import TeacherPage from './TeacherPage/Posts/TeacherPage';

import TeachLogin from './TeacherPage/TeacherLog';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
     
        <Routes>
       <Route index element={<App/>} /> 
        <Route path='/admin'  element={<Login/>}/>
        <Route path="/dashboard" element={<AdminDashboard/>}/>
        <Route path="/institutes" element={<Institutes/>}/>
        <Route path="/profile" element={<div>sdjnclksjcndkj</div>}></Route>

 
        <Route path='/student' element={<StudLogin/>}/>
        <Route path='/posts' element={<StudPage/>}/>

       
        <Route path='/teacher' element={<TeachLogin/>}/>
        <Route path='/teachposts' element={<TeacherPage/>}/>

        <Route path='/admsignout'  element={<Login/>}/>
        <Route path='/studsignout' element={<StudLogin/>}/>
        <Route path='/teachsignout' element={<TeachLogin/>}/>

        <Route path="/institutes" element={<Institutes/>}></Route>
        <Route path="/profile" element={<div>sdjnclksjcndkj</div>}></Route>
        
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);