import React from "react";
import { Route } from "react-router-dom";

// Pages
import Institutes from "./../Institutes";
import Invitation from "./../Invitation";
import Admins from "./../AdminGet/Admins";
import AllInstitutes from "./../All/Institutes";
import Students from "./../All/students";
import Teacher from "./../All/teachers";
import Departments from "./../All/departments";
import Courses from "./../All/courses";
import Groups from "./../All/groups";
import Schedule from "../Accounts/Dashboard/Admin/Schedule";
import ScheduleTeacher from "../Accounts/Dashboard/Admin/ScheduleTeacher";

const AdminRoutes = () => {
  return (
      <>
        <Route exact path="/dashboard">
          <div className="welcome">Welcome to Admin dashboard</div>
        </Route>

        <Route path="/dashboard/editAdmins">
          <Admins />
        </Route>

        <Route path="/dashboard/institutes">
          <Institutes />
        </Route>

        <Route path="/dashboard/invitation">
          <Invitation />
        </Route>

        <Route path="/dashboard/teachers">
          <Teacher />
        </Route>

        <Route path="/dashboard/students">
          <Students />
        </Route>

        <Route path="/dashboard/allinstitutes">
          <AllInstitutes />
        </Route>

        <Route path="/dashboard/departments">
          <Departments />
        </Route>

        <Route path="/dashboard/courses">
          <Courses />
        </Route>

        <Route path="/dashboard/groups">
          <Groups />
        </Route>
        <Route path="/dashboard/schedule">
          <Schedule/>
        </Route>

        <Route path="/dashboard/scheduleforteacher">
          <ScheduleTeacher/>
        </Route>
      </>
  );
};

export default AdminRoutes;
