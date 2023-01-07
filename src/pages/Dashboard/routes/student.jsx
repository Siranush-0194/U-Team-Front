import React from "react";
import { Route } from "react-router-dom";

import StudentAccount from '../Accounts/StudentsAcc';
// Pages

const StudentRoutes = () => {
  return (
      <>
        <Route exact path="/dashboard">
          <div className="welcome">Welocome to Student dashboard</div>
        </Route>

        <Route patch="/dashboard/account">
        <StudentAccount/>
        </Route>
      </>
  );
};

export default StudentRoutes;
