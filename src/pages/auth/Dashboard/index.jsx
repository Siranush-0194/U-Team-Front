import React from 'react';
import { Route } from "react-router-dom";

import "./style.scss";

// Components
import Menu from '../../../components/auth/Menu';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <aside>
        <Menu />
      </aside>

      <section>
        <Route path="/dashboard/students">
          Students
        </Route>

        <Route path="/dashboard/teachers">
          Teachers
        </Route>
      </section>
    </div>
  );
}


export default Dashboard;