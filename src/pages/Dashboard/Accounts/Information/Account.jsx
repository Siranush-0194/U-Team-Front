

import { React, useState, useEffect, useCallback, useMemo } from "react";
import { Button, Drawer, Table, Card, Form, Avatar, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";

import ImgCrop from "antd-img-crop";
import { Route, useParams } from "react-router-dom";
import "../style.scss";
import StudentInfo from './student';
import TeacherInfo from './teacher';
import axios from '../../../../axios';
import { useSelector } from 'react-redux';




const Account = () => {
  const rule = useSelector(function (state) {
    return state.rule;
  });
  const [form] = Form.useForm();
  
  const ChangeForms = useMemo(() => {
    let forms = {
      student: require("./student").default,
      teacher: require("./teacher").default
    };
    return forms[rule];
  }, [rule]);


  

  return (
    <>
     
        <Card style={{ backgroundColor: '#A7C7E7' }} className="account-info">          
        <Form
            className="account-info"
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
          </Form>
          <ChangeForms/>
        </Card>
     
    </>
  );
};

export default Account;
