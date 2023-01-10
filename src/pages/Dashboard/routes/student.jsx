import React from "react";
import { Route } from "react-router-dom";

import StudentAccount from '../Accounts/StudentsAcc';
import AccountsDashboard from '../Accounts/Dashboard/accountsDashboard';

// Pages

const StudentRoutes = () => {
  return (
      <>
        <Route exact path="/dashboard">
          <div className="welcome">Welocome to Student dashboard</div>
        </Route>

        {/* <Route patch="/dashboard/account">
        <StudentAccount/>
        </Route> */}

        <Route patch="/dashboard/account">
        <AccountsDashboard/>
        </Route>


      </>
  );
};

export default StudentRoutes;
