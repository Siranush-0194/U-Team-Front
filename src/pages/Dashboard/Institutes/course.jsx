import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

import axios from "../../../axios";
import { Link } from 'react-router-dom';

const Courses = () => {
    const {departmentID} = useParams();

    const [courses, setCourses] = useState(null);

    useEffect(() => {
        
        axios.get(`/api/department/get/${departmentID}/courses`).then((response) => {
            console.log(1);
            setCourses(response.data)            
        }).catch(() => setCourses([]));      

    }, []);

    return (
        <div className='course'>
            {!courses
                ? <></>
                : <Table
                    rowKey="id"
                    dataSource={courses}
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
                            render: (number, row) => <Link to={`/dashboard/institutes/departments/${departmentID}/${row.id}`}>{number}</Link>
                        }
                    ]} />}
        </div>
    );
}

export default Courses;