

import React from 'react';
import axios from '../../../axios';

import {
  Form,
  Input,
  Button,
  DatePicker,
} from 'antd';

const AdminInvitation = () => {
  const [form] = Form.useForm();

  const onFinish = async () => {
    const values = await form.validateFields();

    values.birthDate = !values['birthDate'] ? "" : values['birthDate'].format('YYYY-MM-DD');

    axios.post(`admin/send-invitation`, values).then((response) => { });
  }

  return (
    <Form
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Form.Item label="FirstName" name='firstName' >
        <Input />
      </Form.Item>

      <Form.Item label="LastName" name='lastName'>
        <Input />
      </Form.Item>

      <Form.Item label="Patronymic" name='patronymic'>
        <Input />
      </Form.Item>

      <Form.Item label="DatePicker" name='birthDate'>
        <DatePicker />
      </Form.Item>

      <Form.Item label="Email" name='email'>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="subZmit" className="submit-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminInvitation;