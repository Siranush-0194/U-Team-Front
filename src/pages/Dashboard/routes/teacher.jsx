import React from "react";
import { Route } from "react-router-dom";
import TeacherAccount from '../Accounts/TeacherAcc';
import AccountsDashboard from '../Accounts/Dashboard/accountsDashboard';

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

        <Route patch="/dashboard/account">
        <AccountsDashboard/>
        </Route>
      </>
  );
};

export default TeacherRoutes;