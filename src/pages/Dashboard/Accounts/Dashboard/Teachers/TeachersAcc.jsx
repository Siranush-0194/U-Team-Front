import { React, useState, useEffect } from "react";
import { Form } from "antd";

import axios from "../../../../../axios";

import "../../style.scss";

const TeacherAccount = () => {
  const [user, setUser] = useState();
  const [department, setDepartment] = useState();
  const [institute, setInstitute] = useState();

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        console.log(response);

        setUser(response.data);
        axios
          .get(`/api/department/get/${response?.data?.departmentId}`)
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
        {user?.firstName + "   " + user?.lastName + " " + user?.patronymic}
      </Form.Item>

      <Form.Item style={{ fontWeight: "bold" }} label="Position">
        {user?.position}
      </Form.Item>

      <Form.Item label="Institute">{institute?.name}</Form.Item>
      <Form.Item label="Department ">{department?.name}</Form.Item>

      <Form.Item label="Mail:">{user?.email}</Form.Item>
    </>
  );
};

export default TeacherAccount;
