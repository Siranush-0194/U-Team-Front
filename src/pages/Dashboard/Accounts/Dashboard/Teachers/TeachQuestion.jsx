import { useEffect, useState } from "react";
import axios, { axios_01 } from "../../../../../axios";
import { Button, Card, Form, Input, List, Modal, Select, Upload } from "antd";
import Tags from "../../../../../components/Tags";
import Likes from "../Likes/Like";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Item from "../../../../../components/Other/Item";
import useGetBase64 from "../../../../../hooks/useGetBase64";

const { Option } = Select;

const TeachQuestion = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [file, setFile] = useState(null);

  const getBase64 = useGetBase64();
  
    const handleChangeCourse = (value) => {
      setSelectedCourseId(value);
    };

    useEffect(() => {
        axios.get('/api/teacher/courses')
          .then(response => {
            setCourses(response.data);
            setSelectedCourseId(response.data?.[0].id)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    
      useEffect(() => {
        if (selectedCourseId) {
          axios_01.get(`/api/question?courseId=${selectedCourseId} ` )
            .then(response => {
              setQuestions(response.data.data);
            })
            .catch(error => {
              console.log(error);
            });
        }
      }, [selectedCourseId]);
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
          !modal.data.id && formData.append("courseId", selectedCourseId);
    
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
                  for (let i = 0; i < questions.length; i++) {
                    if (modal.data.id === response.data.id) {
                      questions[i] = response.data;
                    }
                  }
                } else {
                  questions.unshift(response.data);
                }
                setQuestions(questions);
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
          setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id));
        }).catch((error) => {
          console.log(error);
        });
      }


      return (
        <div>
        <Select  defaultValue={selectedCourseId}  style={{ width: '150px' }} onChange={handleChangeCourse}>
        {courses.map(course => (
          <Option key={course.id} value={course.id}>
            {course.name}
          </Option>
        ))}
      </Select>
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
          {!questions ? (
            <> </>
          ) : (
            <List
              className="demo-loadmore-list"
              itemLayout="vertical"
              dataSource={questions}
              renderItem={(item) => {
                  return <Card style={{ marginBottom: 10 }} actions={[
                    <Likes id={item.id} likedByMe={false} likeCount={0} />,
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
      </div>
      )
}

export default TeachQuestion;
