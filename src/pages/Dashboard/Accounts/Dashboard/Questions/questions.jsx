import { React, useState, useEffect } from "react";
import {
  Form,
  Card,
  Modal,
  Button,
  Input,
  List,
  Avatar,
  Pagination,
} from "antd";
import { axios_01 } from "../../../../../axios";
import { useSelector } from "react-redux";
import { Upload, message } from "antd";

const getBase64 = (data) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const Questions = () => {
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [question, setQuestion] = useState([]);
  const [file, setFile] = useState(null);

  const user = useSelector(function (state) {
    return state?.user;
  });

  useEffect(() => {
    axios_01
      .get(`/api/question?courseId=${user.course.id}`)
      .then((response) => {
        setQuestion(response.data.questions);
      })
      .catch(() => setQuestion([]));
  }, [user.course.id]);

  const toggleModal = () => {
    setModal({ ...modal, isOpen: !modal.isOpen });
    setFile(null);
  };

  const submit = () => {
    if (modal.data.title) {
      const formData = new FormData();

      formData.append("title", modal.data.title);
      formData.append("content", modal.data.content);
      formData.append("media", file.file.originFileObj);
      formData.append("courseId", user.course.id);

      axios_01
        .post(`/api/question`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            question.unshift(response.data);
            setQuestion(question);
            setModal({ isOpen: false, data: {} });

            setFile(null);
          } else {
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUpload = async (data) => setFile(data.file);
  const handlePreview = ({ fileList }) => setFile({ ...file, fileList });
  const handleChange = async (data) => {
    if (!data.file.url && !data.file.preview) {
      data.file.preview = await getBase64(data.file.originFileObj);
    }

    setFile({
      ...file,
      file: data.file,
    });
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = [
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "video/mp4",
      "video/ogg",
      "image/png",
    ].includes(file.type);

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    const isLt9M = file.size / 1024 / 1024 < 9;

    if (!isLt9M) {
      message.error("Image must smaller than 9MB!");
    }

    return isJpgOrPng && isLt9M;
  };

  return (
    <Card style={{ height: "100%" }}>
      <Form>
        <Button type="primary" onClick={toggleModal}>
          + Question
        </Button>

        <Modal
          title="Add Question"
          open={modal.isOpen}
          onOk={submit}
          onCancel={toggleModal}
        >
          <Input
            style={{ gap: 10 }}
            placeholder="Question Title"
            value={modal?.data?.title}
            onChange={(event) => {
              setModal({
                ...modal,
                data: {
                  ...modal.data,
                  title: event.target.value,
                },
              });
            }}
          />
          <Input
            placeholder="Content"
            value={modal?.data?.content}
            onChange={(event) => {
              setModal({
                ...modal,
                data: {
                  ...modal.data,
                  content: event.target.value,
                },
              });
            }}
          />
          <Upload
            name="media"
            listType="picture-card"
            className="media-uploader"
            beforeUpload={beforeUpload}
            customRequest={handleUpload}
            onChange={handleChange}
            onPreview={handlePreview}
            fileList={file?.fileList || []}
            maxCount={1}
          >
            {file ? (
              <img
                src={file?.file?.preview}
                alt="media"
                style={{ width: "100%" }}
              />
            ) : file?.fileList?.length >= 1 ? null : (
              "+ Upload"
            )}
          </Upload>
        </Modal>
      </Form>
      <div
        id="scrollableDiv"
        style={{
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <Card>
          {!question ? (
            <> </>
          ) : (
            <List
              style={{
                height: 650,
                width: 500,
              }}
              className="demo-loadmore-list"
              itemLayout="vertical"
              dataSource={question}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar />}
                    title={item.user.firstName}
                    description={item.title}
                  />
                  {item.content}
                  {<img src={item.media} alt="" />}
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>
      <Pagination defaultCurrent={6} total={500} />
    </Card>
  );
};

export default Questions;
