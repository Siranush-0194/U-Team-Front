import React from 'react';
import { Route } from "react-router-dom";

import "./style.scss";

// Pages
import Institutes from './Institutes';
import Invitation from './Invitation';
import Admins from './AdminGet/Admins';

// Components
import Menu from '../../components/Menu';

const Dashboard = () => {
  return (
    <div className='dashboard'>

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

        <Route path='/dashboard/invitation'>
          <Invitation />
        </Route>

        <Route path='/dashboard/editAdmins'>
          <Admins />
        </Route>
      </section>
    </div>
  );
}

export default Dashboard;