import { React, useState, useEffect, useCallback } from "react";
import { Button, Table, Card,Form  } from "antd";
import { UserOutlined } from "@ant-design/icons";

import ImgCrop from "antd-img-crop";
import { Route, useParams } from "react-router-dom";
import "../../style.scss";
import axios from '../../../../../axios';

const TeacherAccount = () => {
  const [user, setUser] = useState();
  const [form] = Form.useForm();
  const { departmentId,instituteId} = useParams();
  const [department, setDepartment] = useState();
  const [institute, setInstitute] = useState();

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        console.log(response)

        setUser(response.data);
        axios
          .get(
            `/api/department/get/${response?.data?.departmentId}`
          )
          .then((response) => {
            setDepartment(response.data);
            axios
            .get(`/api/institute/get/${response?.data?.instituteId}`)
            .then((response) => {
              // console.log(response.data.name);
              setInstitute(response.data);
            }).catch(() => setInstitute([]))
          })         
          .catch(() => setDepartment([]));
      })
      .catch(() => setUser([]));
  }, []);


 

  return (
    <>
     

    
          {/* <Form className="info"
            className="info"
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          > */}
            {/* <Form.Item > {user.data.firstName + '' + user.data.lastName}</Form.Item> */}

            

             <Form.Item style={{ fontWeight: "bold" }}>
              {user?.firstName +
                "   " +
                user?.lastName +
                " " +
                user?.patronymic}
            </Form.Item>

            <Form.Item style={{ fontWeight: "bold" }} label="Position">
              {user?.position}
            </Form.Item>

            

             <Form.Item label="Institute" >
              {institute?.name}
            </Form.Item>
            <Form.Item  label="Department ">{department?.name}</Form.Item> 

            {/* <Form.Item label="Course">
              {user?.data?.course.number +
                "  " +
                user?.data?.course.degree +
                "  " +
                user?.data?.course.type}
            </Form.Item>

            <Form.Item label='Group'>
            {user?.data?.groups[0].number}
          </Form.Item>  

            <Form.Item label='Subgroup'>
            {user?.data?.course.number}
          </Form.Item>  */}

            <Form.Item label="Mail:">{user?.email}</Form.Item>
          {/* </Form> */}
        {/* </Card> */}
    
    </>
  );
};

export default TeacherAccount;
