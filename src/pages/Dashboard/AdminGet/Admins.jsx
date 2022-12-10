import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from "../../../axios";
import { Table } from "antd";


const Admins = () => {
  const [admins, setAdmins] = useState(null);
  useEffect(() => {
    axios.get("/api/admin/get").then((response) => {
      setAdmins(response.data)
      console.log(response);
    }).catch(() => setAdmins([]));
  }, []);

  return (
    <div className="admins">
      <Route exact path='/dashboard/editAdmins'>
        {!admins
          ? <></>
          : <Table
            dataSource={admins}
            rowKey="id"
            columns={[
              {
                title: 'Patronymic',
                dataIndex: 'patronymic',
                key: 'patronymic',

              },
              {
                title: 'FirstName',
                dataIndex: 'firstName',
                key: 'firstName',

              },
              {
                title: 'LastName',
                dataIndex: 'lastName',
                key: 'LastName',

              },
              {
                title: 'Patronymic',
                dataIndex: 'patronymic',
                key: 'patronymic',

              },
              {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
              },
              {
                title: 'Actions',
                dataIndex: 'actions',
                width: 50,

              }
            ]}
          />}
      </Route>
    </div>
  )
}


export default Admins;