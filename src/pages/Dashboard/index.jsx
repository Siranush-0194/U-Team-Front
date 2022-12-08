import React from 'react';
import { Route } from "react-router-dom";


import "./style.scss";

// Pages
import Institutes from './Institutes';
import StudentInvitation from './Invitation/Forms/StudentForm';
import AdminInvitation from './Invitation/Forms/AdminForm';
import TeacherInvitation from './Invitation/Forms/TeacherForm'

// Components
import Menu from '../../components/Menu';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      {console.log(1)}
      <aside>
        <Menu />
      </aside>

      <section style={{ width: '100%' }}>
          <Route exact path='/dashboard'>
            Home
          </Route>

          <Route path="/dashboard/institutes">
            <Institutes />
          </Route>

          <Route path='/dashboard/student-invitation'>
            <StudentInvitation/>
          </Route>

          <Route path='/dashboard/teacher-invitation'>
            <TeacherInvitation/>
          </Route>

          <Route path='/dashboard/admin-invitation'>
            <AdminInvitation/>
          </Route>
      </section>
    </div>
  );
}


export default Dashboard;