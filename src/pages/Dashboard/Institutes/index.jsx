import React, { useEffect, useState } from 'react';
import { Table, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import axios from "../../../axios";
import { Link, Route } from 'react-router-dom';

// import "./style.scss";
import Departments from './single';

const Institutes = () => {
  const [institutes, setInstitutes] = useState(null);

  useEffect(() => {
    axios.get("/api/institute/get").then((response) => {
      setInstitutes(response.data)
    }).catch(() => setInstitutes([]));
  }, []);

  const handleDelete = (instid) => {
    setInstitutes(institutes => institutes.filter(item => item.Id !== instid));
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
                render: (name, row) => <Link to={`/dashboard/institutes/${row.id}`}>{name}</Link>
              },
              {
                title: 'Actions',
                dataIndex: 'actions',
                render: (_, record) =>
                  institutes.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.rowKey)}>
                      <DeleteOutlined />
                    </Popconfirm>
                  ) : null,
              }
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