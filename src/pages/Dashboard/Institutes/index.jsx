import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Typography,Form, Input, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import axios from "../../../axios";
import { Link, Route } from 'react-router-dom';

// import "./style.scss";
import Departments from './single';

const Institutes = () => {
  const [institutes, setInstitutes] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();


  useEffect(() => {
    axios.get("/api/institute/get").then((response) => {
      setInstitutes(response.data)
    }).catch(() => setInstitutes([]));
  }, []);

  const removeInstitute= (id) => {
    let updateInstitutes = [...institutes].filter((institute) => institute.id !== id);
    setInstitutes(updateInstitutes);
  };

  const handleEdit = (id) => {
    const editInstitute= institutes.find((i) => i.id === id);
    setInstitutes(editInstitute.institute);
    setEditId(id);
  };

  
  

  return (
    
    <div className='institutes'>
     
      <Route exact path='/dashboard/institutes'>
        {!institutes
          ? <></>
          : <Table
            dataSource={institutes}
            rowKey="id"
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
                // render: (text, record,name,row) => {
                //   if (editingRow === record.key) {
                //     return (
                //       <Form.Item name="name">
                //         <Input />
                //       </Form.Item>
                //     );
                //   } else {
                //     return <p>{text}</p>;
                //   }
                // },
                
                render: (name, row) => <Link to={`/dashboard/institutes/${row.id}`}>{name}</Link>
                
              },
              
              {
                title: 'Delete',
                dataIndex: 'delete',   
                render: (_,row) =>
                  institutes.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onClick={() => removeInstitute(row.id)}>
                      <DeleteOutlined />                    
                    </Popconfirm>
                  ) : null,       
              },
              {
                title: 'Edit',
                dataIndex: 'edit'
                }, 
            ]}
          />}
      </Route>
      <Route path='/dashboard/institutes/:instituteId'>
        <Departments />
      </Route>
    </div>
  );
}


export default Institutes;