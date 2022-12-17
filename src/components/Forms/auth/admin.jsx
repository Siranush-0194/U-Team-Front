

import React,{useState} from 'react';
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
  const [messages,setMessages] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  
  const success = () => {
   
      messageApi.open({
      type: 'success',
      content: 'Invite sent',
      duration: 10,
    });
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    values.birthDate = values['birthDate'] ? values['birthDate'].format('YYYY-MM-DD') : undefined;

    axios.post(`admin/send-invitation`, values).then((Jsonresponse) => {
      form.resetFields();
    }).catch((error) => {
      console.log(error);
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
      <Form.Item label= {t("FirstName")} name='firstName' >
        <Input />
      </Form.Item>

      <Form.Item label={t("LastName")} name='lastName'>
        <Input />
      </Form.Item>

      <Form.Item label={t("Patronymic")} name='patronymic'>
        <Input />
      </Form.Item>

      <Form.Item label={t("DatePicker")} name='birthDate'>
        <DatePicker />
      </Form.Item>

      <Form.Item label={t("Email")} name='email'>
        <Input />
      </Form.Item>

      <Form.Item>
        {contextHolder}
        <Button type="primary" htmlType="subZmit" className="submit-form-button" onClick={success}>
          {t('Submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminInvitation;