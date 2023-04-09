import React, { useEffect, useState, useCallback, useMemo} from 'react';
import { useParams } from 'react-router-dom';
import { Table, Modal, Button, Input, Popconfirm } from 'antd';

import axios from "../../../../axios";
import { Link, Route } from 'react-router-dom';
import Courses from './Curses';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Departments = () => {
  const { instituteId } = useParams();
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [tableData, setTableData] = useState(null);
  const [type, setType] = useState("departments");

  const handleGetInstitute = useCallback(() => {
    axios.get(`/api/institute/get/${instituteId}/${type}`).then((response) => {
      setTableData(response.data)
    }).catch(() => setTableData([]));
  }, [type]);

  useEffect(() => {
    handleGetInstitute()
  }, [handleGetInstitute]);

  const columns = useMemo(() => {
    const columns = {
      departments: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (name, row) => <Link to={`/dashboard/institutes/departmen${instituteId}/${row.id}`}>{name}</Link>
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
              <EditOutlined onClick={() => setModal({ isOpen: true, data: row })} />
            </div>
        },
        {
          title: 'Show',
          dataIndex: 'show',
          width: 50,
          render: (show, row) => <Link to={`/dashboard/institutes/${instituteId}/${row.id}`}>{<Button type='primary'>Show Courses</Button>}</Link>
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


 
  const removeDepartment = (id) => {
    axios.delete(`/api/department/delete/${id}`).then((response) => {
      setTableData(prev => prev.filter((item) =>  item.id !== id));
    })
  
  };

  return (
    <div className='department'>
      <Modal title={modal?.data?.id ? 'Edit Department name' : 'Add Department name'} open={modal.isOpen} onOk={() => {
        if (modal.data.id) {
          axios.patch(`/api/department/edit/${modal.data.id}`, modal.data).then(response => {
            if (response.status === 200) {
              let newDepartment = tableData.map(element => {
                if (element.id === response.data.id) {
                  element = response.data
                }

                return element
              });

              setTableData(newDepartment);

              setModal({ isOpen: false, data: {} })
            } else {
              // console.log(response);
            }
          })
        } else {
          axios.post(`/api/department/create`, { ...modal.data, institute_id: instituteId }).then(response => {
            if (response.status === 201) {
              setTableData(tableData.concat(response.data));

              setModal({ isOpen: false, data: {} });
            } else {
              // console.log(response);
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
        <div style={{ display: 'flex', gap: 10 }}>
          <Button type='primary' onClick={() => setModal({ isOpen: true, data: {} })}>Add Department</Button>
        
          
        </div>
        {!tableData
          ? <></>
          : <Table
            rowKey="id"
            dataSource={tableData}
              columns={columns} />}           
      </Route>

      <Route path='/dashboard/institutes/:instituteId/:departmentId'>
        <Courses />
      </Route>
    </div>
  );
}

export default Departments;