import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

import axios from "../../../axios";
import { Link, Route } from 'react-router-dom';
import Courses from './course';

// import "./style.scss";

const Departments = () => {
    const { instituteId } = useParams();

    const [departments, setDepartments] = useState(null);

    useEffect(() => {
        axios.get(`/api/institute/get/${instituteId}/departments`).then((response) => {
            setDepartments(response.data)
        }).catch(() => setDepartments([]));
    }, []);

    return (
        <div className='department'>
            {!departments
                ? <></>
                : <Table
                    rowKey="id"
                    dataSource={departments}
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
                            render: (name, row) => <Link to={`/dashboard/institutes/${instituteId}/${row.id}`}>{name}</Link>
                        }
                    ]} />}
            <Route path='/dashboard/institutes/:instituteId/:departmentId'>
                <Courses />
            </Route>
        </div>
    );
}

export default Departments;