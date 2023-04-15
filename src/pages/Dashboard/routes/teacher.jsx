import React from "react";
import { Route } from "react-router-dom";
// Components
import Account from "../Accounts/Information/Account";
import Questions from "../Accounts/Dashboard/Questions/questions";
import TeacherForum from "../Accounts/Dashboard/Teachers/TeacherForum";
import Studyies from "../Accounts/Dashboard/Teachers/Students";
import Storage from "../Accounts/Dashboard/Storage";
import Courses from "../Accounts/Dashboard/Teachers/Students";
// Pages

const TeacherRoutes = () => {
  return (
    <>
      <Route exact path="/dashboard">
        <TeacherForum />
      </Route>

      <Route path="/dashboard/account">
        <Account />
      </Route>

      <Route path="/dashboard/local">
      <Storage  type={'local'}/>
        </Route>

        <Route path="/dashboard/global">
        <Storage type={'global'}/>
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
