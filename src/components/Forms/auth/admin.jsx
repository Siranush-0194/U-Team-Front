

import React from 'react';
import axios from '../../../axios';

import {
  Form,
  Input,
  Button,
  DatePicker,
  message
} from 'antd';
import { useTranslation } from 'react-i18next';

const AdminInvitation = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a prompt message for success, and it will disappear in 10 seconds',
      duration: 10,
    });
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    values.birthDate = values['birthDate'] ? values['birthDate'].format('YYYY-MM-DD') : undefined;

    axios.post(`admin/send-invitation`, values).then((response) => {
      form.resetFields();
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.errors) {
        let fields = ["firstName", "lastName","patronymic","birthDate","email", ];

        fields.forEach(field => {console.log(error.response.data.errors);
          if (error.response.data.errors[field]) {
            form.setFields([
              {
                name: field,
                errors: [t(error.response.data.errors[field][0])]
              }
            ]);
          }
        });
      }
    });
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
        {contextHolder}
        <Button type="primary" htmlType="subZmit" className="submit-form-button" onClick={success}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminInvitation;