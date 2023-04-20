import React from "react";
import { Route } from "react-router-dom";

import Friends from "../Accounts/Dashboard/Students/Friends";
import Lecturer from "../Accounts/Dashboard/Students/Lecturer";
import Notes from "../Accounts/Dashboard/Notes/Notes";
import Account from "../Accounts/Information/Account";
import Questions from "../Accounts/Dashboard/Questions/questions";
import StudentForum from "../Accounts/Dashboard/Students/Forum";
import Post from "../Accounts/Dashboard/Posts/posts";

import MyCalendar from "../Calendar/Calendar";
import LocalStorage from "../Accounts/Dashboard/Storage/Local";
import GlobalStorage from "../Accounts/Dashboard/Storage/Global";


// Pages
const StudentRoutes = () => {
  return (
    <>
      <Route exact path="/dashboard">
      {/* <AccountHeader /> */}

        <StudentForum />
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
       <LocalStorage/>
      </Route>

      <Route path="/dashboard/global">
       <GlobalStorage/>
      </Route>

      <Route path="/dashboard/questions">
        <Questions />
      </Route>

      <Route path="/dashboard/posts">
        <Post />
      </Route>

      <Route path="/dashboard/calendar">
        <MyCalendar />
      </Route>
    </>
  );
};

export default StudentRoutes;
