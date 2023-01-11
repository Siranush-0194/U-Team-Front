import React from "react";
import { Route } from "react-router-dom";


import AccountsDashboard from '../Accounts/Dashboard/accountsDashboard';
import StudentAccount from '../Accounts/Dashboard/Students/StudentsAcc';
import Friends from '../Accounts/Dashboard/Students/Friends';
import Lecturer from '../Accounts/Dashboard/Students/Lecturer';
import Notes from '../Accounts/Dashboard/Students/Notes';



// Pages

const StudentRoutes = () => {
  return (
      <>
        <Route exact path="/dashboard">
          <div className="welcome">Welocome to Student dashboard</div>
          <AccountsDashboard/>
        </Route>

        {/* <Route patch="/dashboard/account">
        <StudentAccount/>
        </Route> */}

        <Route path="/dashboard/account">
        <AccountsDashboard/>
        </Route>

        <Route path="/dashboard/teachers">
          <Lecturer/>
         </Route>
         

        <Route path="/dashboard/students">
          <Friends/>
         </Route> 

         <Route path="/dashboard/notes">
          <Notes/>
         </Route>  


      </>
  );
};

export default StudentRoutes;
