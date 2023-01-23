import { React, useState, useEffect, useCallback } from "react";
import { Button,  Table, Card, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";

import ImgCrop from "antd-img-crop";
import { Route, useParams } from "react-router-dom";
import "../../style.scss";
import axios from "../../../../../axios";

const StudentAccount = () => {

  const [user, setUser] = useState();
  const [form] = Form.useForm();
  const { departmentId, instituteId } = useParams();
  const [department, setDepartment] = useState();

  const [institute, setInstitute] = useState();

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        setUser(response.data);
        axios
          .get(
            `/api/department/get/${response?.data?.course.departmentId}`
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
   

            <Form.Item style={{ fontWeight: "bold" }}>
              {user?.firstName +
                "   " +
                user?.lastName +
                " " +
                user?.patronymic}
            </Form.Item>

            <Form.Item label="Institute">{institute?.name}</Form.Item>
            <Form.Item label="Department ">{department?.name}</Form.Item>

            <Form.Item label="Course">
              {user?.course.number +
                "  " +
                user?.course.degree +
                "  " +
                user?.course.type}
            </Form.Item>

            <Form.Item label="Group">{user?.groups[0].number}</Form.Item>

            {/* <Form.Item label='Subgroup'>
            {user?.data?.course.number}
          </Form.Item> */}

            <Form.Item label="Mail:">{user?.email}</Form.Item>
          {/* </Form> */}
        {/* </Card> */}
       {/* </Drawer> */}
    </>
  );
};

export default StudentAccount;
