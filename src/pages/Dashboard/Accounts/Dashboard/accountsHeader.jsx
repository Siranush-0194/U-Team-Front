import { React, useEffect, useMemo, useState } from "react";
import "../style.scss";
import { BellOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Drawer,
  Form,
  Input,
  Layout,
  Switch as AntSwitch,
  Upload,
} from "antd";
import { useTranslation } from "react-i18next";

import ImgCrop from "antd-img-crop";
import { useSelector } from "react-redux";
import axios from "../../../../axios";
import { useHistory } from "react-router-dom";

const { Search } = Input;

const AccountHeader = () => {
  const { i18n } = useTranslation();
  const [form] = Form.useForm();
  const { Header } = Layout;
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const history = useHistory();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const rule = useSelector(function (state) {
    return state.rule;
  });

  useEffect(() => {
    axios
      .get("/api/avatar/get")
      .then((response) => {
        setImageUrl(response.data);
      })
      .catch((error) => {
        setImageUrl([]);
      });
  }, []);

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
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await (file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  function handleQuestions() {
    history.push("/dashboard/questions");
  }

  function handlePosts() {
    history.push("/dashboard/posts");
  }

  const ChangeForms = useMemo(() => {
    let forms = {
      student: require("./Students/StudentsAcc").default,
      teacher: require("./Teachers/TeachersAcc").default,
    };

    return forms[rule];
  }, [rule]);

  return (
    <Header>
      <Card className="header-container">
        <img
          src="../images/Uteam.jpeg"
          className="app-logo"
          alt="logo"
          style={{ width: 50, height: 70, objecyFit: "cover" }}
        />

        <div className="search-container">
          <Search
            placeholder="input search text"
            className="search"
            enterButton
          />
          <BellOutlined className="notification" style={{ fontSize: "150%" }} />
          <MailOutlined className="messenger" style={{ fontSize: "150%" }} />
          <AntSwitch
            style={{ width: 70 }}
            checkedChildren="Eng"
            unCheckedChildren="հայ"
            defaultChecked
            onChange={changeLanguage}
          />
          <div className="search-container-actions">
            <Button
              type="primary"
              className="question"
              onClick={handleQuestions}
            >
              Questions
            </Button>
            <Button
              type="primary"
              className="posts-button"
              onClick={handlePosts}
            >
              Posts
            </Button>
          </div>
        </div>

        <div className="account-container">
          <Avatar
            className="avatar"
            size={64}
            icon={<UserOutlined />}
            src={imageUrl}
            onClick={showDrawer}
          />

          <Drawer
            form={form}
            title={"Information"}
            onClose={onClose}
            open={open}
          >
            <Card style={{ backgroundColor: "#aaaaaa" }}>
              <Avatar
                size={200}
                src={imageUrl}
                icon={
                  ((<UserOutlined />),
                  (
                    <ImgCrop>
                      <Upload
                        action={(avatar) => {
                          const formData = new FormData();

                          formData.append("avatar", avatar);
                          axios({
                            method: "post",
                            url: "/api/avatar/store",
                            data: formData,
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          })
                            .then((response) => setAvatar(response.data))
                            .catch((error) => setAvatar([]));
                        }}
                        shape="round"
                        name="avatar"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}
                        onPreview={handlePreview}

                      >
                        {fileList.length >= 1 ? null : "+ Upload"}
                      </Upload>
                    </ImgCrop>
                  ))
                }
              />
              <Form
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
        </div>
      </Card>
    </Header>
  );
};

export default AccountHeader;
