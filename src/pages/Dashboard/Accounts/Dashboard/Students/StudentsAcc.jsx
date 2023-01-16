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

  
  // const onChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };
  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };

  // const showDrawer = () => {
  //   setOpen(true);
  // };
  // const onClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      {/* <div className="account">
        <Avatar
          className="avatar"
          size={64}
          icon={<UserOutlined onClick={showDrawer} />}
        />
      </div>

      <Drawer form={form} title={"Information"} onClose={onClose} open={open}>
        <Card style={{ backgroundColor: "#aaaaaa" }}>
          <Avatar
            size={200}
            icon={
              ((<UserOutlined />),
              (
                
                <ImgCrop rotate>
                  <Upload
                    action={(file) => {
                      // const formData = new FormData();

                      // console.log();
                      // Object.entries(file).forEach(([key, element]) => {
                      //   // formData.append("avatar", );
                      //   console.log(key, element);
                      // });

                      axios
                        .post("/api/avatar/store", {
                          avatar: file
                        }, {
                          "Content-Type": "multipart/form-data"
                        })
                        .then((response) => {
                          if (response.status === 201) {
                            setAvatar(response);
                          }
                          // console.log(response);
                        })
                        .catch(() => setAvatar([]));
                    }}
                    shape="round"
                    name="avatar"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              ))
            }
          /> */}
          {/* <Form
            // className="info"
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
