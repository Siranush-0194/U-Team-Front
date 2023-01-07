import  { React, useState, useEffect } from 'react';
import { Button, Drawer, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from '../../../axios';
import { Route } from 'react-router-dom';






const StudentAccount = () => {
     const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/user").then((response) => {
      setUser(response.data)
      console.log(response);
    }).catch(() => setUser([]));
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

 
  return(
    <>
      <div className="admins">
    
    </div>
   
    <UserOutlined onClick={showDrawer}/>
 
  <Drawer
    title="Information"
    placement="right"
    onClose={onClose}
    open={open}
  ></Drawer>
  </>
  
  )
}



export default StudentAccount;