import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

import axios from "../../../axios";
import { Link } from 'react-router-dom';

// import "./style.scss";

const Institute = () => {
    const { id } = useParams();

    const [departments, setDepartments] = useState(null);

    useEffect(() => {
        axios.get(`/api/institute/get/${id}/departments`).then((response) => {
            setDepartments(response.data)
        }).catch(() => setDepartments([]));
    }, []);

    return (
        <div className='institute'>
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
                            render: (name, row) => <Link to={`/dashboard/institutes/${id}/${row.id}`}>{name}</Link>
                        }
                    ]} />}
        </div>
    );
}


export default Institute;