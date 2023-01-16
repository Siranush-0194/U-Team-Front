import { React, useState, useMemo } from "react";
import "../style.scss";
import { AudioOutlined, MailOutlined, BellOutlined } from "@ant-design/icons";
import {
  Input,
  Space,
  Layout,
  Drawer,
  Button,
  Badge,
  Calendar,
  Avatar,
  Upload,
  Form,
} from "antd";
import { Card } from "antd";
import { Switch as AntSwitch } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import { UserOutlined } from "@ant-design/icons";
import StudentAccount from "./Students/StudentsAcc";
import axios from "../../../../axios";
import ImgCrop from "antd-img-crop";
import TeacherAccount from "./Teachers/TeachersAcc";
// import Account from "../Account";
import { useSelector } from 'react-redux';

const { Search } = Input;

const AccountsDashboard = () => {
  const { i18n } = useTranslation();
  const [form] = Form.useForm();
  const { Header } = Layout;
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState();
  const [fileList, setFileList] = useState([]);

  const rule = useSelector(function (state) {
    return state.rule;
  });

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "am" ? "en" : "am");
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const ChangeForms = useMemo(() => {
    let forms = {
      student: require("./Students/StudentsAcc").default,
      teacher: require("./Teachers/TeachersAcc").default,
    };
    return forms[rule];
  }, [rule]);

  return (
    <Header>
      <Card className="head">
        <img
          src="../images/Uteam.jpeg"
          className="logo"
          alt="logo"
          width={50}
          height={18000}
        />
        <div className="account">
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
                          .post(
                            "/api/avatar/store",
                            {
                              avatar: file,
                            },
                            {
                              "Content-Type": "multipart/form-data",
                            }
                          )
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
            />
            <Form
              // className="info"
              form={form}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
            >
              <ChangeForms />
            </Form>
          </Card>
        </Drawer>
        <Search
          placeholder="input search text"
          className="search"
          enterButton
        />
        <BellOutlined className="notification" style={{ fontSize: "150%" }} />
        <MailOutlined className="messenger" style={{ fontSize: "150%" }} />
        {/* <StudentAccount/>    */}
        {/* <Account/> */}
        <Button type="primary" className="question">
          + Question{" "}
        </Button>
        <AntSwitch
          className="switcher"
          checkedChildren="Eng"
          unCheckedChildren="հայ"
          defaultChecked
          onChange={changeLanguage}
        />
      </Card>
    </Header>
  );
};

export default AccountsDashboard;
