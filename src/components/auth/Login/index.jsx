import React, { useMemo, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card } from 'antd';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../../axios';

import "./style.scss";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [type, setType] = useState("admin");

  const rules = useSelector(function (state) {
    return state.rules;
  });

  const rule = useMemo(() => {
    return rules[type];
  }, [type, rules]);

  const onFinish = async (values) => {
    try {
      delete values.remember;

      const response = await axios.post(rule.submit, values);

      if (response && response.data && response.data.data) {
        dispatch({
          type: 'login',
          payload: response.data.data
        });

        localStorage.setItem("user", JSON.stringify(response.data.data));

        history.push("dashboard")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      title={t(rule.title)}
      className='Login__form'
      actions={['admin', 'student', 'teacher'].map(item => {
        return <Button type="primary" ghost={type !== item} className="form-button" onClick={() => setType(item)}>{t(item)}</Button>;
      })}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: t('Please input your Email!') }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t('Please input your Password!') }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder= "Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t("Remember me")}</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
           {t("Forgot password")}
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
          { t("Log in")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;