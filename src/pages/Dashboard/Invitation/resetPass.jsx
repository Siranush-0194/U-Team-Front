import React, { useState, useEffect } from "react";
import { Input, Form, Button, Card, message} from "antd";

import axios from "../../../axios";
import useQuery from "../../../hooks/useQuery";
import './style.scss'
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";


const ResetPassword = () => {
  const query = useQuery()
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [token] = useState(query.get('token'))
  const {t} = useTranslation();
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();

  // const success = () => {
  //   messageApi.open({
  //     type: 'message',
  //     value: 'message',
  //     duration: 10,
  //   });
  // }
  

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

    axios.post('/accept/invitation', values).then((Jsonresponse) => {
      form.resetFields();
    }).catch((error) => {
      console.log(error);
      if (error.response && error.response.data && error.response.data.errors) {
        let fields = ["password", "confirm" ];
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
    <>
     <img src="../images/Uteam.jpeg" className="logo" alt="logo" width={100} height={100} />
      {!user ? <></> :
       <Card  className='resetCard' title={user.firstName + ' ' + user.lastName + '' + user.email} style={{ width: 600, gap:10 }}>
        <Form  onFinish={onFinish}>
          <Form.Item
          className='passwordInput'
            name="password"
            label="Password"
            rules={[
              
              {
                required: true,
                message: 'Please input your password!',
              }            
            ]}
           
            hasFeedback
          >
            <Input.Password  className='passwordInput'/>
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
            <Input.Password   className='confirmInput' />
          </Form.Item>
          <Form.Item >
       
            <Button  className='register'type="primary" htmlType="submit" >
              Register
            </Button>
            <Button  className='register'type="primary" htmlType="submit" onClick={()=> {<Login/>}} >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
      }
    </>
  )
}


export default ResetPassword;