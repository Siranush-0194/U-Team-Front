import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table,Modal,Button,Input,Popconfirm } from 'antd';

import axios from "../../../../axios";
import { Link, Route } from 'react-router-dom';
import Courses from './Curses';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

// import "./style.scss";

const Departments = () => {
    const { instituteId, departmentId } = useParams();
    const [modal, setModal] = useState({ isOpen: false, data: {} });
    const [departments, setDepartments] = useState(null);

    useEffect(() => {
        axios.get(`/api/institute/get/${instituteId}/departments`).then((response) => {
            setDepartments(response.data)
        }).catch(() => setDepartments([]));
    }, []);
    const removeDepartment = (id) => {
        axios.delete(`/api/department/delete/${id}`).then((response) => {
          let updateDepartment = [...departments].filter((department) => department.id !== id);
          setDepartments(updateDepartment);
        });
      };

    return (
        <div className='department'>
            <Modal title={modal?.data?.id ? 'Edit Department name' : 'Add Department name'} open={modal.isOpen} onOk={() => {
        if (modal.data.id) {
          axios.patch(`/api/department/edit/${modal.data.id}`, modal.data).then(response => {
            if (response.status === 200) {
              let newDepartment = departments.map(element => {
                if (element.id === response.data.id) {
                  element = response.data
                }

                return element
              });

              setDepartments(newDepartment);

              setModal({ isOpen: false, data: {} })
            } else {
              console.log(response);
            }
          })
        } else {
          axios.post(`/api/department/create`, { ...modal.data, institute_id: instituteId, }).then(response => {
            if (response.status === 201) {
              setDepartments(departments.concat(response.data));

              setModal({ isOpen: false, data: {}});
            } else {
              console.log(response);
            }
          })
        }
      }} onCancel={() => setModal({ isOpen: false, data: {} })}>
        <Input placeholder="Department  name" value={modal?.data?.name} onChange={(event) => {
          setModal({
            ...modal,
            data: {
              ...modal.data,
              name: event.target.value,
              
            }
          })
        }} />
      </Modal>
            <Route exact path='/dashboard/institutes/:instituteId'>
            <Button onClick={() => setModal({ isOpen: true, data: {}})}>Add Department</Button>
                {!departments
                    ? <></>
                    : <Table
                        rowKey="id"
                        dataSource={departments}
                        columns={[
                            {
                                title: 'ID',
                                dataIndex: 'id',
                                key: 'id',
                            },
                            {
                                title: 'Name',
                                dataIndex: 'name',
                                key: 'name',
                                render: (name, row) => <Link to={`/dashboard/institutes/${instituteId}/${row.id}`}>{name}</Link>
                            },
                            {
                                title: 'Actions',
                                dataIndex: 'actions',
                                width: 50,
                                render: (_, row) =>
                                  <div style={{ display: 'flex', gap: 10 }}>
                                    <Popconfirm title="Sure to delete?" onConfirm={() => removeDepartment(row.id)}>
                                      <DeleteOutlined />
                                    </Popconfirm>
                                    <EditOutlined onClick={() => setModal({ isOpen: true, data: row, instituteId })} />
                                  </div>
                              }
                        ]} />}
            </Route>
            <Route path='/dashboard/institutes/:instituteId/:departmentId'>
                <Courses />
            </Route>
        </div>
    );
}

export default Departments;