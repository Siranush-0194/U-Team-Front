import React from "react";
import { Route } from "react-router-dom";
import AccountsDashboard from '../Accounts/Dashboard/accountsDashboard';
// import TeacherAccount from '../Accounts/Dashboard/Teacher/TeacherAcc';
import Account from '../Accounts/Information/Account';

// Pages

const TeacherRoutes = () => {
  return (
      <>
        <Route exact path="/dashboard">
          <div className="welcome">Welocome to Techer dashboard</div>
          <AccountsDashboard/>
        </Route>

        <Route patch="/dashboard/account">
        <Account/>
        <AccountsDashboard/>
        </Route>

        <Route path="/dashboard/local">        
          <AccountsDashboard/>
         </Route>  

         <Route path="/dashboard/global">        
        <AccountsDashboard/>
       </Route> 

      </>
  );
};

export default TeacherRoutes;