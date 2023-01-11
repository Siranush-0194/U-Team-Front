import React from "react";
import { Route } from "react-router-dom";
import AccountsDashboard from '../Accounts/Dashboard/accountsDashboard';
import TeacherAccount from '../Accounts/Dashboard/Teacher/TeacherAcc';

// Pages

const TeacherRoutes = () => {
  return (
      <>
        <Route exact path="/dashboard">
          <div className="welcome">Welocome to Techer dashboard</div>
        </Route>

        {/* <Route patch="/dashboard/account">
        <TeacherAccount/>
        </Route>

        <Route patch="/dashboard/account">
        <AccountsDashboard/>
        </Route> */}
      </>
  );
};

export default TeacherRoutes;