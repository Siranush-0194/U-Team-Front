import React from "react";
import { Route } from "react-router-dom";
// Components
import Account from "../Accounts/Information/Account";
import Questions from "../Accounts/Dashboard/Questions/questions";
import TeacherForum from "../Accounts/Dashboard/Teachers/TeacherForum";
import Students from "../Accounts/Dashboard/Teachers/Students";

import Courses from "../Accounts/Dashboard/Teachers/Students";

import './app.scss'


import TeacherGlobalStorage from "../Accounts/Dashboard/Teachers/Global";
import TeacherLocalStorage from "../Accounts/Dashboard/Teachers/Local";
import Notes from "../Accounts/Dashboard/Notes/Notes";
import MyCalendar from "../Calendar/Calendar";
// Pages

const TeacherRoutes = () => {
  return (
    <>
      <Route exact path="/dashboard">
        {/* <AccountHeader/> */}
        <TeacherForum />
      </Route>

      <Route path="/dashboard/account">
        <Account />
      </Route>

      <Route path="/dashboard/local">
        {/* <LocalStorage/> */}
        <TeacherLocalStorage />
      </Route>

      <Route path="/dashboard/global">
        <TeacherGlobalStorage />

        {/* <GlobalStorage/> */}
      </Route>

      <Route path="/dashboard/courses">
        <Courses />
      </Route>

      <Route path="/dashboard/notes">
        <Notes />
      </Route>

      <Route path="/dashboard/calendar">
        <MyCalendar/>
      </Route>


      <Route path="/dashboard/questions">
        <Questions />
      </Route>
    </>
  );
};



export default TeacherRoutes;
