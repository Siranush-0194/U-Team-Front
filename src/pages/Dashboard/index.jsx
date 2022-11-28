import React from 'react';
import { Route } from "react-router-dom";


import "./style.scss";

// Pages
import Institutes from './Institutes';
import Invitation from './Invitation/Invitation';


// Components
import Menu from '../../components/Menu';
import ResetPassword from './Invitation/resetPass';

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
            <Invitation/>
          </Route>
      </section>
    </div>
  );
}


export default Dashboard;