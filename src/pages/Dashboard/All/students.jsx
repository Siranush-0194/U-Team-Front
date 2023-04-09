import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Form} from 'antd';
import { DeleteOutlined} from '@ant-design/icons';

import axios from "../../../axios";
import {  Route } from 'react-router-dom';


const Students = () => {
  const [students, setStudents] = useState(null);
  const form = Form.useForm()

  useEffect(() => {
    axios.get("/api/student/get").then((response) => {
      setStudents(response.data)
    }).catch(() => setStudents([]));
  }, []);
  const onFinish = async () => {
    const values = await form.validateFields();
    values.birthDate = !values['birthDate'] ? "" : values['birthDate'].format('YYYY-MM-DD');
  }
  const removeStudents = (id) => {
    axios.delete(`/api/student/delete/${id}`).then((response) => {
      let updateStudents = [...students].filter((student) => student.id !== id);
      setStudents(updateStudents);
    });
  };

  return (
    <div className='institutes'>
      <Route exact path='/dashboard/students'>
        {!students
          ? <></>
          : <Table
            dataSource={students}
            rowKey="id"
            onFinish={onFinish}
            columns={[
              {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',

              },
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
                    <Popconfirm title="Sure to delete?" onConfirm={() => removeStudents(row.id)}>
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

export default Students;