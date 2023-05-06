import React, { useState, useEffect } from "react";
import { Input, Form, Button, Card, message } from "antd";
import axios from "../../../axios";
import useQuery from "../../../hooks/useQuery";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import Login from "../../../components/Login/index";
import { useDispatch } from 'react-redux';

const ResetPassword = () => {
  const query = useQuery();
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [token] = useState(query.get("token"));
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  // const success = () => {
  //   messageApi.open({
  //     type: 'message',
  //     value: 'message',
  //     duration: 10,
  //   });
  // }

  useEffect(() => {
    axios
      .get(`accept/invitation?token=${token}`)
      .then((response) => {
        let user = response.data[0];

        try {
          user.payload = JSON.parse(user.payload);

          setUser({
            ...user,
            ...user.payload,
          });
        } catch (e) {
          //
        }
      })
      .catch(() => setUser([token]));
  }, [token]);

  const onFinish = (values) => {
    values.token = token;
    values.password_confirmation = values.confirm;

    delete values.confirm;

    axios
      .post("/accept/invitation", values)
      .then((Jsonresponse) => {
        form.resetFields();
      })
      .catch((error) => {
        if (error.response.data.errors) {
          let fields = ["password", "confirm"];
          fields.forEach((field) => {
            if (error.response.data.errors[field]) {
              form.setFields([
                {
                  name: field,
                  errors: error.response.data.errors[field],
                },
              ]);
            }
          });
        }
      });
  };

  const goToLogin = () => {
    dispatch({
      type: 'login',
      payload: {}
    });
    history.push("/")
  };

  return (
    <>
      <img
        src="../images/Uteam.svg"
        className="logo"
        alt="logo"
        width={100}
        height={100}
      />
      {!user ? (
        <></>
      ) : (
        <Card
          className="resetCard"
          title={user.firstName + " " + user.lastName + "" + user.email}
          style={{ width: 600, gap: 10 }}
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item name="password" label="Password" >
            <Input.Password  className='passwordInput'/>
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              
            >
               <Input.Password  className='passwordInput'/>
            </Form.Item>
            <Form.Item>
              <Button className="register" type="primary" htmlType="submit">
                Register
              </Button>

              <Button
                className="register"
                type="primary"
                onClick={goToLogin}
              >
                Go to Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
};

export default ResetPassword;
