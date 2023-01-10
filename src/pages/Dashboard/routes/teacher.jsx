import React from "react";
import { Route } from "react-router-dom";
import TeacherAccount from '../Accounts/TeacherAcc';

// Pages

const TeacherRoutes = () => {
  return (
      <>
        <Route exact path="/dashboard">
          <div className="welcome">Welocome to Techer dashboard</div>
        </Route>

        <Route patch="/dashboard/account">
        <TeacherAccount/>
        </Route>
      </>
  );
};

export default TeacherRoutes;