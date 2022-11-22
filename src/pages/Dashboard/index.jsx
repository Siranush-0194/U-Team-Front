import React from 'react';
import { Route } from "react-router-dom";

import "./style.scss";

// Pages
import Institutes from './Institutes';

// Components
import Menu from '../../components/Menu';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <aside>
        <Menu />
      </aside>

      <section>
          <Route exact path='/dashboard'>
            Home
          </Route>

          <Route path="/dashboard/institutes">
            <Institutes />
          </Route>
      </section>
    </div>
  );
}


export default Dashboard;