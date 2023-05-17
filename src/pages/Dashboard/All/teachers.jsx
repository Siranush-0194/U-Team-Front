import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Button, Form, Select } from 'antd';
import { DeleteOutlined} from '@ant-design/icons';

import axios from "../../../axios";
import { Route } from 'react-router-dom';


const Teacher = () => {
  const [teachers, setTeachers] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, data: {} });

  useEffect(() => {
    axios.get("/api/teacher/get").then((response) => {
      setTeachers(response.data)
    }).catch(() => setTeachers([]));
  }, []);

  const removeTeacher = (id) => {
    axios.delete(`/api/teacher/delete/${id}`).then((response) => {
      let updateTeachers = [...teachers].filter((teacher) => teacher.id !== id);
      setTeachers(updateTeachers);
    });
  };

  return (
    <div className='institutes'>
      <Route exact path='/dashboard/teachers'>
     

        {!teachers
          ? <></>
          : <Table
            dataSource={teachers}
            rowKey="id"
            columns={[
              {
                title: 'FirstName',
                dataIndex: 'firstName',
                key: 'firstName',           
              },
              {
                title: 'LasttName',
                dataIndex: 'lastName',
                key: 'lastName',           
              },
              {
                title: 'Patronymic',
                dataIndex: 'patronymic',
                key: 'patronymic',           
              },
              {
                title: 'Position',
                dataIndex: 'position',
                key: 'position',           
              },
              {
                title: 'BirthDate',
                dataIndex: 'birthDate',
                key: 'birthDate',           
              },
              {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',           
              },
              {
                title: 'Actions',
                dataIndex: 'actions',
                width: 50,
                render: (_, row) =>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Popconfirm title="Sure to delete?" onConfirm={() => removeTeacher(row.id)}>
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
              }
            ]}
          />}
      </Route>
    
    </div>
  );
}

export default Teacher;