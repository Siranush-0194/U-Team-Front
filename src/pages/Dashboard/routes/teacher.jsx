import React from "react";
import { Route } from "react-router-dom";
// Components
import Account from "../Accounts/Information/Account";
import Questions from "../Accounts/Dashboard/Questions/questions";

// Pages

const TeacherRoutes = () => {
  return (
    <>
      <Route exact path="/dashboard">
        <div className="welcome">Welocome to Techer dashboard</div>
      </Route>

      <Route path="/dashboard/account">
        <Account />
      </Route>

      <Route path="/dashboard/local">{/*  */}</Route>

      <Route path="/dashboard/global">{/*  */}</Route>

      <Route path="/dashboard/questions">
        <Questions />
      </Route>
    </>
  );
};

export default TeacherRoutes;
