import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Popconfirm, Input, Modal, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from '../../../../../../../axios';
import { Link, Route } from 'react-router-dom';

const SubGroups = () => {
  const { courseId, subgroupId } = useParams();
//   console.log(subgroupId);
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [groups, setGroups] = useState(null);
  const [students, setStudents] = useState();

  useEffect(() => {
    axios.get(`/api/course/get/${courseId}/groups`).then((response) => {
      setGroups(response.data)
    }).catch(() => setGroups([]));

    axios.get(`/api/course/get/${courseId}/students`).then((response) => {
    //   console.log(response);
      setStudents(response.data)
    }).catch(() => setStudents([]))
  }, []);

  const removeGroup = (id) => {
    axios.delete(`/api/group/delete/${id}`).then((response) => {
      let updateGroup = [...groups].filter((group) => group.id !== id);
      setGroups(updateGroup);
    });
  };

  return (
    <div className='group'>
      <Modal title={modal?.data?.id ? 'Edit group number' : 'Add group number'} open={modal.isOpen} onOk={() => {
        if (modal.data.id) {
          axios.patch(`/api/group/edit/${modal.data.id}`, modal.data).then(response => {
            if (response.status === 200) {
              let newGroup = groups.map(element => {
                if (element.id === response.data.id) {
                  element = response.data
                }

                return element
              });

              setGroups(newGroup);

              setModal({ isOpen: false, data: {} })
            } else {
              console.log(response);
            }
          })
        } else {
          axios.post(`/api/group/create`, { ...modal.data, course_id: courseId }).then(response => {
            if (response.status === 201) {
              setGroups(groups.concat(response.data));

              setModal({ isOpen: false, data: {} });
            } else {
            //   console.log(response);
            }
          })
        }
      }} onCancel={() => setModal({ isOpen: false, data: {} })}>
        <Input placeholder="Groupu number" value={modal?.data?.name} onChange={(event) => {
          setModal({
            ...modal,
            data: {
              ...modal.data,
              number: event.target.value,

            }
          })
        }} />
      </Modal>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button type='primary' onClick={() => setModal({ isOpen: true, data: {} })}>Add Group</Button>
        <Button type='primary'> Students</Button>
        <Button type='primary'> Teachers</Button>
      </div>
      {!groups
        ? <></>
        : <Table
          rowKey="id"
          dataSource={groups}
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
              render: (number, row) => <Link to={`/dashboard/institutes/departments/course/${courseId}/${row.id}`}>{number}</Link>
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
                  <EditOutlined onClick={() => setModal({ isOpen: true, data: row, courseId })} />
                </div>
            }
          ]} />}
           <Route path='/dashboard/institutes/:instituteId/:departmentId/:courseId/parentId'>
        <SubGroups />
      </Route>
    </div>
    
  );
}

export default SubGroups;