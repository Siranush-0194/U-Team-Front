import React, { useEffect, useMemo, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import { Table, Popconfirm, Modal, Input, Button, Select, Form } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Groups from './Group';
import axios from "../../../../../axios";
import { Link } from 'react-router-dom';

const Courses = () => {
  const { departmentId } = useParams();
  const [tableData, setTableData] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [type, setType] = useState("courses");

  const getTableData = () => {
    axios.get(`/api/department/get/${departmentId}/${type}`).then((response) => {
      setTableData(response.data)
    }).catch(() => setTableData([]));
  }

  useEffect(() => {
    getTableData()
  }, [type]);

  const columns = useMemo(() => {
    const columns = {
      courses: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: 'Number',
          dataIndex: 'number',
          key: 'number',
          render: (number, row) => <Link to={`/dashboard/institutes/departments/${departmentId}/${row.id}`}>{number}</Link>
        },
        {
          title:'Degree',
          dataIndex: 'degree',
          key: 'degree'
        },
        {
          title: 'Type',
         dataIndex: 'type',
          key: 'type',
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
      ],
      teachers: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'name'
        },
        {
          title: 'Last Name',
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
      ]
    }

    return columns[type];
  }, [type])

  const removeCourse = (id) => {
    axios.delete(`/api/course/delete/${id}`).then((response) => {
      let updateCourse = [...tableData].filter((course) => course.id !== id);
      setTableData(updateCourse);
    });
  };

  return (
    <div className='course'>
      <Modal title={modal?.data?.id ? 'Edit Course number' : 'Add Course number'} open={modal.isOpen} onOk={() => {
        if (modal.data.id) {
          axios.patch(`/api/course/edit/${modal.data.id}`, modal.data).then(response => {
            if (response.status === 200) {
              let newCourse = tableData.map(element => {
                if (element.id === response.data.id) {
                  element = response.data
                }

                return element
              });

              setTableData(newCourse);

              setModal({ isOpen: false, data: {} })
            } else {
              // console.log(response);
            }
          })
        } else {
          // console.log({ ...modal.data, department_id: departmentId, });
          axios.post('/api/course/create', { ...modal.data, department_id: departmentId, }).then(response => {
            if (response.status === 201) {
              setTableData(tableData.concat(response.data));

              setModal({ isOpen: false, data: {} });
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

      <Route exact path='/dashboard/institutes/:institutesId/:departmentID'>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button type='primary' onClick={() => setModal({ isOpen: true, data: {} })}>Add Course</Button>
          <Button type='primary' onClick={() => setType("courses")}> Courses</Button>
          <Button type='primary' onClick={() => setType("teachers")}> Teachers</Button>
        </div>

        {!tableData
          ? <></>
          : <Table
            rowKey="id"
            dataSource={tableData}
            columns={columns} />}
      </Route>
      <Route path='/dashboard/institutes/:instituteId/:departmentId/:courseId'>
        <Groups />
      </Route>
    </div>
  );
}

export default Courses;