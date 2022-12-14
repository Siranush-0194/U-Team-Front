import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Input, Modal, Button, Form, Select  } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import axios from "../../../axios";
import {Route, useParams } from 'react-router-dom';



const Courses = () => {
  const [courses, setCourses] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const { departmentId, parentId   } = useParams();
  const [tableData, setTableData] = useState(null);
  const [type, setType] = useState("courses");

  useEffect(() => {
    axios.get("/api/course/get").then((response) => {
      setCourses(response.data)
    }).catch(() => setCourses([]));
  }, []);

  const removeCourse = (id) => {
    axios.delete(`/api/course/delete/${id}`).then((response) => {
      let updateCourse = [...courses].filter((course) => course.id !== id);
      setCourses(updateCourse);
    });
  };

  return (
    <div className='courses'>
      <Modal title={modal?.data?.id ? 'Edit Course name' : 'Add Course name'} open={modal.isOpen} onOk={() => {
        if (modal.data.id) {
          axios.patch(`/api/course/edit/${modal.data.id}`, modal.data).then(response => {
            if (response.status === 200) {
              let newCourses = courses.map(element => {
                if (element.id === response.data.id) {
                  element = response.data
                }

                return element
              });

              setCourses(newCourses);

              setModal({ isOpen: false, data: {} })
            } else {
              // console.log(response);
            }
          })
        } 
      }} onCancel={() => setModal({ isOpen: false, data: {} })}>
        <Form>
          <Form.Item label="Number" name="number">
            <Input placeholder="Course number" value={modal?.data?.number} onChange={(event) => {
              setModal({
                ...modal,
                data: {
                  ...modal.data,
                  number: event.target.value
                }
              })
            }} />
          </Form.Item>

          <Form.Item label="Degree" name='degree'>
            <Select defaultValue="..." onChange={(value) => {
              setModal({
                ...modal,
                data: {
                  ...modal.data,
                  degree: value,
                }
              })
            }} options={[{ label: "master", value: "master" }, { label: "bachelor", value: "bachelor" }, { label: "PhD", value: "PhD" }]} />
          </Form.Item>

          <Form.Item label="Type" name='type'>
            <Select defaultValue="..." onChange={(value) => {
              setModal({
                ...modal,
                data: {
                  ...modal.data,
                  type: value,
                }
              })
            }} options={[{ label: "available", value: "available" }, { label: "remotely", value: "remotely" }]} />
          </Form.Item>
        </Form>
        </Modal>

      <Route exact path='/dashboard/courses'>
       
        {!courses
          ? <></>
          : <Table
            dataSource={courses}
            rowKey="id"
            columns={[
              {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',

              },
              {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
              },
              {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
              },
              {
                title: 'Degree',
                dataIndex: 'degree',
                key: 'degree',
              },
              {
                title: 'Actions',
                dataIndex: 'actions',
                width: 50,
                render: (_, row) =>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Popconfirm title="Sure to delete?" onConfirm={() => removeCourse(row.id)} >
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


export default Courses;