

import { React, useState, useEffect, useCallback } from "react";
import { Button, Drawer, Table, Card, Form, Avatar, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";

import ImgCrop from "antd-img-crop";
import { Route, useParams } from "react-router-dom";
import "../style.scss";
import axios from '../../../axios';


const Account = () => {

  const [user, setUser] = useState();
  const [form] = Form.useForm();
  const { departmentId,instituteId} = useParams();
  const [department, setDepartment] = useState();
  const [fileList, setFileList] = useState([]);
  const [institute, setInstitute] = useState();

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {

        setUser(response.data);
        axios
          .get(
            `/api/department/get/${response?.data?.data?.course.departmentId}`
          )
          .then((response) => {
            setDepartment(response.data);

            axios
              .get(`/api/institute/get/${response?.data?.instituteId}`)
              .then((response) => {
                // console.log(response.data.name);
                setInstitute(response.data);
              })
              .catch(() => setInstitute([]));
          })
          .catch(() => setDepartment([]));
      })
      .catch(() => setUser([]));
  }, []);


  

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
            {/* <Form.Item > {user.data.firstName + '' + user.data.lastName}</Form.Item> */}

            <Form.Item  label ="First Name">
              {user?.data?.firstName +
                "   " +
                user?.data?.lastName +
                " " +
                user?.data?.patronymic}
            </Form.Item>

            <Form.Item label="Institute">{institute?.name}</Form.Item>
            <Form.Item label="Department ">{department?.name}</Form.Item>

            <Form.Item label="Course">
              {user?.data?.course.number +
                "  " +
                user?.data?.course.degree +
                "  " +
                user?.data?.course.type}
            </Form.Item>

            <Form.Item label="Group">{user?.data?.groups[0].number}</Form.Item>

            {/* <Form.Item label='Subgroup'>
            {user?.data?.course.number}
          </Form.Item> */}

            <Form.Item label="Mail:">{user?.data?.email}</Form.Item>
          </Form>
        </Card>
     
    </>
  );
};

export default Account;
