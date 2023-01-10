import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Input, Modal,Form,Select} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import axios from "../../../axios";
import { Link, Route, useParams } from 'react-router-dom';



const Groups = () => {
  const [groups, setGroups] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const {courseId, groupId, parentId } = useParams();
  const [tableData, setTableData] = useState(null);
  const [type, setType] = useState("groups");

  useEffect(() => {
    axios.get("/api/group/get-course/").then((response) => {
        console.log(response);
      setGroups(response.data)
    }).catch(() => setGroups([]));
  }, []);

  const removeGroup = (id) => {
    axios.delete(`/api/group/delete/${id}`).then((response) => {
      let updateGroups = [...groups].filter((group) => group.id !== id);
      setGroups(updateGroups);
    });
  };

  return (
    <div className='groups'>
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
        } }} onCancel={() => setModal({ isOpen: false, data: {} })}>
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

      <Form.Item label="number" name='number'>
       <Select defaultValue="..." onChange={(value) => {
         setModal({
           ...modal,
           data: {
             ...modal.data,
             parent_id: value,
           }
         })
       }} options={tableData?.map(data => ({
         label: data.number,
         value: data.id
       }))} />
     </Form.Item>
     </Modal>

      <Route exact path='/dashboard/groups'>
        {!groups
          ? <></>
          : <Table
            dataSource={groups}
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
                title:"ParentId",
                dataIndex:"parentId",
                key:"parentId"
              },
              {
                title:"CourseId",
                dataIndex:"course",
                key:"courseId"
              },
           
              {
                title: 'Actions',
                dataIndex: 'actions',
                width: 50,
                render: (_, row) =>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Popconfirm title="Sure to delete?"  onConfirm={() => removeGroup(row.id)}>
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

export default Groups;