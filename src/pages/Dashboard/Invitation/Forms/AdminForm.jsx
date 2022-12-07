

import React  from 'react';
import axios from '../../../../axios';


import {
  Form,
  Input,
  Button,
  DatePicker,
 
} from 'antd';
import { useHistory } from 'react-router-dom';

const AdminInvitation = () => {
  const [form] = Form.useForm();

  const history = useHistory();




 
  
  const NavigateTeacherInvitation=()=>{
    history.push('/dashboard/teacher-invitation')
  }

  const NavigateStudentInvitation=()=>{
    history.push('/dashboard/invitation')
  }
 


//   const rules = useSelector(function (state) {
//     return state.rules;
//   });

//   const rule = useMemo(() => {
//     return rules[type];
//   }, [type, rules]);
  


  const onFinish = async () => {
    const values = await form.validateFields();
    values.birthDate = values['birthDate'].format('YYYY-MM-DD')
    axios.post(`admin/send-invitation`, values).then((response) => { });
  }

  return (
    <>
     {/* <Card     
      actions={['admin', 'student', 'teacher'].map(item => {
        return <Button type="primary" ghost={type !== item} className="form-button" onClick={(zzzzzz) => setType(item)}>{item}</Button>;
      })}
    > */}
      <Form
        form={form}
        labelCol={{
          span: 4,
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
            Save
          </Button>
        </Form.Item>
        <Button onClick={NavigateTeacherInvitation}>Teacher </Button>
        <Button onClick={NavigateStudentInvitation}>Student </Button>
      </Form>

      {/* </Card> */}
    </>
  );
};

export default () => <AdminInvitation />;
