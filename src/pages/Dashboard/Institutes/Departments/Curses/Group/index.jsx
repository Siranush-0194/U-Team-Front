import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import { Table } from 'antd';

import axios from '../../../../../../axios';
import { Link } from 'react-router-dom';

const Groups = (props) => {
    const { courseId } = useParams();

    const [groups, setGroups] = useState(null);

    useEffect(() => {
        axios.get(`/api/course/get/${courseId}/groups`).then((response) => {
            setGroups(response.data)
        }).catch(() => setGroups([]));
    }, []);

    return (
        <div className='group'>
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
                        }
                    ]} />}
                    
        </div>
    );
}

export default Groups;