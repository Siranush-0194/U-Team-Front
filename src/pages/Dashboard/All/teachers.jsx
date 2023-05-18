import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Button, Form, Select, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';

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
        <Modal title={ 'Edit Teacher info' } open={modal.isOpen} onOk={() => {
        if (modal.data.id) {
          axios.patch(`/api/teacher/edit/${modal.data.id}`, modal.data).then(response => {
            if (response.status === 200) {
              let newTeacher = teachers.map(element => {
                if (element.id === response.data.id) {
                  element = response.data
                }

                return element
              });

              setTeachers(newTeacher);

              setModal({ isOpen: false, data: {} })
            } else {
              // console.log(response);
            }
          })
        } 
      }} onCancel={() => setModal({ isOpen: false, data: {} })}>
      {/* <Input placeholder="teacher name" value={modal?.data?.name} onChange={(event) => {
          setModal({
            ...modal,
            data: {
              ...modal.data,
              name: event.target.value
            }
          })
        }} /> */}
         <Input placeholder="teacher firtsName" value={modal?.data?.firstName} onChange={(event) => {
          setModal({
            ...modal,
            data: {
              ...modal.data,
              firstName: event.target.value
            }
          })
        }} />
         <Input placeholder="teacher lastName" value={modal?.data?.lastName} onChange={(event) => {
          setModal({
            ...modal,
            data: {
              ...modal.data,
              lastName: event.target.value
            }
          })
        }} />
         <Input placeholder="teacher patronyimic" value={modal?.data?.patronymic} onChange={(event) => {
          setModal({
            ...modal,
            data: {
              ...modal.data,
              patronymic: event.target.value
            }
          })
        }} />
          <Input placeholder="teacher position" value={modal?.data?.position} onChange={(event) => {
          setModal({
            ...modal,
            data: {
              ...modal.data,
              position: event.target.value
            }
          })
        }} />
        <Input placeholder="teacher birthDate" value={modal?.data?.birthDate} onChange={(event) => {
          setModal({
            ...modal,
            data: {
              ...modal.data,
             birthDate: event.target.value
            }
          })
        }} />
        
      </Modal>
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
                    <EditOutlined onClick={() => setModal({ isOpen: true, data: row })} />

                  </div>
              }
            ]}
          />}
      </Route>
    
    </div>
  );
}

export default Teacher;