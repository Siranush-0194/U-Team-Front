import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import { Table, Popconfirm, Modal, Input, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Groups from './Group';
import axios from "../../../../../axios";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import DepartmentTeacher from './Teacher';

const Courses = (props) => {
  const { departmentId } = useParams();
  const { courseId, instituteId } = useParams()
  const [type, number, degree] = useState();
  const [courses, setCourses] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [teachers, setTeachers] = useState();
  const history = useHistory();

  useEffect(() => {
    axios.get(`/api/department/get/${departmentId}/courses`).then((response) => {
      setCourses(response.data)
    }).catch(() => setCourses([]));

    axios.get(`/api/department/get/${departmentId}/teachers`).then((response) => {
      console.log(response);
      setTeachers(response.data)
    }).catch(() => setTeachers)

  }, []);


  // const historyTeacher = () => {
  //   history.push(`/dashboard/institutes/:${instituteId}/:${departmentId}/teacher`)

  // }
  const removeCourse = (id) => {
    axios.delete(`/api/course/delete/${id}`).then((response) => {
      let updateCourse = [...courses].filter((course) => course.id !== id);
      setCourses(updateCourse);
    });
  };

  return (
    <div className='course'>
      <Modal title={modal?.data?.id ? 'Edit Course number' : 'Add Course number'} open={modal.isOpen} onOk={() => {
        if (modal.data.id) {
          axios.patch(`/api/course/edit/${modal.data.id}`, modal.data).then(response => {
            if (response.status === 200) {
              let newCourse = courses.map(element => {
                if (element.id === response.data.id) {
                  element = response.data
                }

                return element
              });

              setCourses(newCourse);

              setModal({ isOpen: false, data: {} })
            } else {
              console.log(response);
            }
          })
        } else {
          axios.post('/api/course/create', { ...modal.data, department_id: departmentId, }).then(response => {
            if (response.status === 201) {
              setCourses(courses.concat(response.data));

              setModal({ isOpen: false, data: {} });
            } else {
              console.log(response);
            }
          })
        }
      }} onCancel={() => setModal({ isOpen: false, data: {} })}>
        <Input placeholder="Course number" value={modal?.data?.number} onChange={(event) => {
          setModal({
            ...modal,
            data: {
              ...modal.data,
              number: event.target.value
            }
          })
        }} />
      </Modal>
      <Route exact path='/dashboard/institutes/:institutesId/:departmentID'>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button type='primary' onClick={() => setModal({ isOpen: true, data: {} })}>Add Course</Button>
          <Button type='primary' o> Teacher</Button>
        </div>

        {!courses
          ? <></>
          : <Table
            rowKey="id"
            dataSource={courses}
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
                render: (number, row) => <Link to={`/dashboard/institutes/departments/${departmentId}/${row.id}`}>{number}</Link>
              },
              {
                title: 'Actions',
                dataIndex: 'actions',
                width: 50,
                render: (_, row) =>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Popconfirm title="Sure to delete?" onConfirm={() => removeCourse(row.id)}>
                      <DeleteOutlined />
                    </Popconfirm>
                    <EditOutlined onClick={() => setModal({ isOpen: true, data: row })} />
                  </div>
              }
            ]} />}
      </Route>
      <Route path='/dashboard/institutes/:instituteId/:departmentId/:courseId'>
        <Groups />
      </Route>
    </div>
  );
}

export default Courses;