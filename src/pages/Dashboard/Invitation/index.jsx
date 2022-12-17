import React, { useState } from "react";
import { Button, Card, Form } from "antd";
import { useTranslation } from "react-i18next";

// Components
import { useMemo } from "react";

const Invitation = () => {
    const { t } = useTranslation();

    const [type, setType] = useState("admin");

    const [form] = Form.useForm();

    const Layout = useMemo(() => {
        let forms = {
            admin: require('../../../components/Forms/auth/admin').default
        }

        if (!forms[type]) {
            const layout = require(`../../../components/Forms/auth/${type}`)?.default;
            if (layout) {
                forms[type] = layout;
            }
        }

        return forms[type];
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

export default Invitation;