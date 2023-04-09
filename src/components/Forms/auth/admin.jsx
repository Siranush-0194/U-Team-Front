
import React,{useState,useMemo} from 'react';
import axios from '../../../axios';
import {
  Form,
  Input,
  Button,
  DatePicker,
  message
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const AdminInvitation = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [type] = useState("admin");

  const rules = useSelector(function (state) {
    return state.rules;
  });
  const rule = useMemo(() => {
    return rules[type];
  }, [type, rules]);

  const success = (message) => {
      messageApi.open({
      type: 'success',
      content: message,
      duration: 10,
    });
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    values.birthDate = values['birthDate'] ? values['birthDate'].format('YYYY-MM-DD') : undefined;

    axios.post(rule.invitation, values).then((response) => {
      if (response?.status === 200) {
        success(response?.data.message);
        form.resetFields();
      }
    }).catch((error) => {
      // console.log(error);
      if (error.response && error.response.data && error.response.data.errors) {
        let fields = ["firstName", "lastName","patronymic","birthDate","email", ];
        fields.forEach(field => {;
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
        <Button type="primary" htmlType="subZmit" className="submit-form-button">
          {t('Submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminInvitation;