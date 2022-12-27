import React, { useState } from "react";
import { Button, Card, Form } from "antd";
import { useTranslation } from "react-i18next";
// Components
import { useMemo } from "react";


const RolesDashboard = () => {
    const { t } = useTranslation();

    const [type, setType] = useState("admin");
 
    // const [form] = Form.useForm();

    const Layout = useMemo(() => {
        let dashboard = {
            admin: require('./Dashboard/index').default
        }

        if (!dashboard[type]) {
            const layout = require(`../components/Forums/${type}`)?.default;
            if (layout) {
                dashboard[type] = layout;
            }
        }
        return dashboard[type];
    }, [type]);

    const onFinish = () => {

    };

    return (
        <>
            <Card
                className='Login__form wide'
                actions={['admin', 'student', 'teacher'].map(item => {
                    return <Button type="primary" ghost={type !== item} className="form-button" onClick={() => setType(item)}>{t(item)}</Button>;
                })}
            >
                <Layout  />
            </Card>
        </>
    )
}

export default RolesDashboard;