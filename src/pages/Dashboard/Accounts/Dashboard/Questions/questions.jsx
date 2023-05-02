import { React, useState, useEffect } from "react";
import {
  Form,
  Card,
  Modal,
  Button,
  Input,
  List
} from "antd";
import { axios_01 } from "../../../../../axios";
import { useSelector } from "react-redux";
import { Upload } from "antd";
import useGetBase64 from "../../../../../hooks/useGetBase64";
import Tags from "../../../../../components/Tags/index";
import Item from "../../../../../components/Other/Item";
import { CommentOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Likes from "../Likes/Like";

const Questions = () => {
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [question, setQuestion] = useState([]);
  const [file, setFile] = useState(null);

  const getBase64 = useGetBase64();

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
    setModal({ isOpen: !modal.isOpen, data: {} });
    setFile(null);
  };

  const submit = () => {
    if (modal.data.title) {
      const formData = new FormData();

      formData.append("title", modal.data.title);
      formData.append("content", modal.data.content);
      file?.file?.originFileObj && formData.append("media", file?.file?.originFileObj);
      !modal.data.id && formData.append("courseId", user.course.id);

      (modal?.data?.tags || []).forEach((tag) => {
        formData.append("tags[]", tag);
      });

      axios_01
        .post(`/api/question${modal.data.id ? `/${modal.data.id}` : ''}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            if (modal.data.id) {
              for (let i = 0; i < question.length; i++) {
                if (modal.data.id === response.data.id) {
                  question[i] = response.data;
                }
              }
            } else {
              question.unshift(response.data);
            }
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
      data.file.preview = await getBase64.init(data.file.originFileObj);
    }

    setFile({
      ...file,
      file: data.file,
    });
  };
  const deleteFile = (id) => {
    axios_01.delete(`api/question/${id}`).then(() => {
      // Refresh the media list
      setQuestion(prevQuestions => prevQuestions.filter(question => question.id !== id));
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <Card style={{ height: "100%" }}>
      <Button type="primary" onClick={toggleModal} style={{ marginBottom: 10 }}>
        + Question
      </Button>

      <Modal
        title="Add Question"
        open={modal.isOpen}
        onOk={submit}
        onCancel={toggleModal}
      >
        <Form style={{ marginTop: 10 }}>
          <Form.Item>
            <Input
              size="large"
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
          </Form.Item>

          <Form.Item>
            <Input
              size="large"
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
          </Form.Item>

          <Form.Item>
            <Tags
              name="tags"
              list={modal.data.tags}
              onChange={(values) => {
                setModal({
                  ...modal,
                  data: {
                    ...modal.data,
                    tags: values,
                  },
                });
              }}
            />
          </Form.Item>

          <Form.Item>
            <Upload
              name="media"
              listType="picture-card"
              className="media-uploader"
              beforeUpload={getBase64.beforeUploadMedia}
              customRequest={handleUpload}
              onChange={handleChange}
              onPreview={handlePreview}
              fileList={file?.fileList || []}
              maxCount={1}
            >
              {file || (modal.data?.id && modal.data?.media?.split('question')[1]) ? (
                <img
                  src={file?.file?.preview || modal.data?.media}
                  alt="media"
                  style={{ width: "100%", height: '100%', borderRadius: '6px' }}
                />
              ) : file?.fileList?.length >= 1 ? null : (
                "+ Upload"
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <div
        id="scrollableDiv"
        style={{
          overflow: "auto",
          padding: "0 16px",
        }}
      >
          {!question ? (
            <> </>
          ) : (
            <List
              className="demo-loadmore-list"
              itemLayout="vertical"
              dataSource={question}
              renderItem={(item) => {
                  return <Card style={{ marginBottom: 10 }} actions={[
                    <Likes id={item.id} likedByMe={item.likedByMe}/>,
                    <EditOutlined
                        key="edit"
                        style={{ color: 'blue' }}
                        onClick={() => setModal({
                          isOpen: true,
                          data: {
                            ...item,
                            tags: item.tags.map(t => t.name)
                          },
                        })}
                    />,
                    
                    <DeleteOutlined key ='delete' style={{color:'red'}} onClick={() => deleteFile(item.id)}  type="danger" />
                  ]}>
                    <Item item={item} mediaKey={'question'} />
                  </Card>
              }}
            />
            )}
      </div>
    </Card>
  );
};

export default Questions;