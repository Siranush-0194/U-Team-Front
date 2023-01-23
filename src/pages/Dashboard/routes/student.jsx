import React from "react";
import { Route } from "react-router-dom";

import Friends from "../Accounts/Dashboard/Students/Friends";
import Lecturer from "../Accounts/Dashboard/Students/Lecturer";
import Notes from "../Accounts/Dashboard/Notes/Notes";
import GlobalStorage from "../Accounts/Dashboard/Storage/GlobalStorage";
import Account from "../Accounts/Information/Account";
import Questions from "../Accounts/Dashboard/Questions/questions";

// Pages
const StudentRoutes = () => {
  return (
    <>
      <Route exact path="/dashboard">
        <div className="welcome">Welocome to Student dashboard</div>
      </Route>

      <Route path="/dashboard/account">
        <Account />
      </Route>

      <Route path="/dashboard/teachers">
        <Lecturer />
      </Route>

      <Route path="/dashboard/students">
        <Friends />
      </Route>

      <Route path="/dashboard/notes">
        <Notes />
      </Route>

      <Route path="/dashboard/local">
        {/* TODO */}
      </Route>

      <Route path="/dashboard/global">
        <GlobalStorage />
      </Route>

      <Route path="/dashboard/questions">
        <Questions />
      </Route>

      <Route path="/dashboard/posts">{/* TODO */}</Route>
    </>
  );
};

export default StudentRoutes;
