import React, { useEffect, useState,useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Popconfirm, Input, Modal, Button, Form } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import axios from '../../../../../../axios';
import { Link, Route } from 'react-router-dom';


const Groups = () => {
  const { courseId, parentId } = useParams();
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [tableData, setTableData] = useState(null);
  const [type, setType] = useState("groups");
  const [students, setStudents] = useState();

  const getTableData = () => {
    axios.get(`/api/course/get/${courseId}/${type}`).then((response) => {
      setTableData(response.data)
    }).catch(() => setTableData([]));
  }

    useEffect(() => {
      getTableData()
    }, [type]);

  
  
const columns = useMemo(() => {
    const columns = {
      groups: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: 'Number',
          dataIndex: 'number',
          key: 'number',
        
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          width: 50,
          render: (_, row) =>
            <div style={{ display: 'flex', gap: 10 }}>
              <Popconfirm title="Sure to delete?" onConfirm={() => removeGroup(row.id)}>
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
      ],
        students: [
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          }
        ]
      
    }

    return columns[type];
  }, [type])

  const removeGroup = (id) => {
    axios.delete(`/api/group/delete/${id}`).then((response) => {
      let updateGroup = [...tableData].filter((group) => group.id !== id);
      setTableData(updateGroup);
    });
  };

  return (
    <div className='group'>
      <Modal title={modal?.data?.id ? 'Edit group number' : 'Add group number'} open={modal.isOpen} onOk={() => {
        if (modal.data.id) {
          axios.patch(`/api/group/edit/${modal.data.id}`, modal.data, { parent_id: parentId }).then(response => {
            if (response.status === 200) {
              let newGroup = tableData.map(element => {
                if (element.id === response.data.id) {
                  element = response.data
                }

                return element
              });

              setTableData(newGroup);

              setModal({ isOpen: false, data: {} })
            } else {
              // console.log(response);
            }
          })
        } else {
          axios.post('/api/group/create', { ...modal.data, course_id: courseId, parent_id:parentId}).then(response => {
            if (response.status === 201) {
              setTableData(tableData.concat(response.data));

              setModal({ isOpen: false, data: {} });
            } else {
              console.log(response);
            }
          })
        }
      }} onCancel={() => setModal({ isOpen: false, data: {} })}>
         <Form.Item label="Number" name="number"> 
        <Input placeholder="Group number" value={modal?.data?.name} onChange={(event) => {
          setModal({
            ...modal,
            data: {
              ...modal.data,
              number: event.target.value,

            }
          })
        }} />
       </Form.Item>
      </Modal>

      <Route exact path='/dashboard/institutes/:institutesId/:departmentID/:courseID'>
      <div style={{ display: 'flex', gap: 10 }}>
      <Button type='primary' onClick={() => setModal({ isOpen: true, data: {} })}>Add Group</Button>
          <Button type='primary' onClick={() => setType("groups")}> Groups</Button>
          <Button type='primary' onClick={() => setType("teachers")}> Teachers</Button>
          <Button type='primary' onClick={() => setType("students")}> Students</Button>
      </div>
      {!tableData
        ? <></>
        : <Table
          rowKey="id"
          dataSource={tableData}
          columns={columns} />}
          </Route>
         
        
    </div>    
  );
      }   



export default Groups;


