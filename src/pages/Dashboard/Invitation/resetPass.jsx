import React, { useState, useEffect } from "react";
import { Input, Form, Button, Card, message} from "antd";

import axios from "../../../axios";
import useQuery from "../../../hooks/useQuery";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const ResetPassword = () => {
  const query = useQuery()
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [token] = useState(query.get('token'))
  const {t} = useTranslation
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'message',
      value: 'message',
      duration: 10,
    });
  }
  

  useEffect(() => {
    axios.get(`accept/invitation?token=${token}`).then((response) => {
      let user = response.data[0];

      try {
        user.payload = JSON.parse(user.payload);

        setUser({
          ...user,
          ...user.payload
        });
      } catch (e) {
        // 
      }
    }).catch(() => setUser([token]));
  }, [token]);

  const onFinish = (values) => {
    values.token = token;
    values.password_confirmation = values.confirm;

    delete values.confirm;

    axios.post('/accept/invitation', values).then((response) => {
      form.resetFields();
    
    }
    )
  }

  return (
    <>
      {!user ? <></> : <Card title={user.firstName + ' ' + user.lastName + '' + user.email} style={{ width: 600 }}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item >
          {contextHolder}
            <Button type="primary" htmlType="submit" onClick={success}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>}
    </>
  )
}

export default ResetPassword;