import React from "react";
import { Route } from "react-router-dom";
// Components
import Account from "../Accounts/Information/Account";
import Questions from "../Accounts/Dashboard/Questions/questions";
import TeacherForum from "../Accounts/Dashboard/Teachers/TeacherForum";
import Studyies from "../Accounts/Dashboard/Teachers/Students";

import Courses from "../Accounts/Dashboard/Teachers/Students";
import AccountHeader from "../Accounts/Dashboard/accountsHeader";
import './app.scss'
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
      {/* <Storage  type={'local'}/> */}
        </Route>

        <Route path="/dashboard/global">
        {/* <Storage type={'global'}/> */}
        </Route>

      <Route path="/dashboard/courses">
       <Courses/>
      </Route>

      <Route path="/dashboard/questions">
        <Questions />
      </Route>
    </>
  );
};



export default TeacherRoutes;
