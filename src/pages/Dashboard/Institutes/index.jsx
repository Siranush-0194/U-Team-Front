import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import axios from "../../../axios";
import { Link, Route } from 'react-router-dom';

// import "./style.scss";

import SingleInstitute from "./single"

const Institutes = () => {
  const [institutes, setInstitutes] = useState(null);

  useEffect(() => {
    axios.get("/api/institute/get").then((response) => {
      setInstitutes(response.data)
    }).catch(() => setInstitutes([]));
  }, []);

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
              }
            ]} />}
      </Route>

      <Route path='/dashboard/institutes/:id'>
        <SingleInstitute />
      </Route>
    </div>
  );
}


export default Institutes;