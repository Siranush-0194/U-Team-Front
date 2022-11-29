import React, { useState, useEffect } from "react";
import { Input, Form, Button, Card } from "antd";

import axios from "../../../axios";
import useQuery from "../../../hooks/useQuery";

const ResetPassword = () => {
  const query = useQuery()
  const [user, setUser] = useState(null);
  const [token] = useState(query.get('token'))

  useEffect(() => {
    axios.get(`accept/invitation?token=${token}`).then((response) => {
      setUser(response.data[0])
    }).catch(() => setUser([token]));
  }, [token]);

  const onFinish = (values) => {
    values.token = token;
    values.password_confirmation = values.confirm;

    delete values.confirm;

   axios.post('/accept/invitation', values).then((response) => {
      console.log(response);
    })
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
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>}
    </>
  )
}


export default ResetPassword;