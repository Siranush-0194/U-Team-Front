import React, { Component } from 'react';
import Header from './AdminPage/Navbar/Header';
import Content from './AdminPage/Content';
import SideBar from './AdminPage/SideBar';
class AppAdmin extends Component {

  render() {
    return (
      <div>
        <Header />
        <SideBar />
        <Content />
      </div>
    );
  }
}

export default AppAdmin;