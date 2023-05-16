import { React, useState, useEffect } from "react";
import {
  Form,
  Card,
  Modal,
  Button,
  Input,
  List,
  Select
} from "antd";
import axios, { axios_01} from "../../../../../axios";
import { useSelector } from "react-redux";
import { Upload } from "antd";
import useGetBase64 from "../../../../../hooks/useGetBase64";
import Tags from "../../../../../components/Tags/index";
import Likes from "../Likes/Like";
import Item from "../../../../../components/Other/Item";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TeachTags from "./TeachTags";

const TeachPosts = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [post, setPost] = useState([]);
  const [file, setFile] = useState(null);
  const { Option } = Select;
  const getBase64 = useGetBase64();

  const user = useSelector(function (state) {
    return state?.user;
  });


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
    axios_01
      .get(`/api/post?courseId=${selectedCourseId}`)
      .then((response) => {
        setPost(response.data.posts);
      })
      .catch(() => setPost([]));
  }, [selectedCourseId]);

  const toggleModal = () => {
    setModal({ isOpen: !modal.isOpen, data: {} });
    setFile(null);
  };

  const deleteFile = (id) => {
    axios_01.delete(`api/post/${id}`).then(() => {
      // Refresh the media list
      setPost(prevPosts => prevPosts.filter(post => post.id !== id));
    }).catch((error) => {
      console.log(error);
    });
  }

 
  

  const submit = () => {
    if (modal.data.title) {
      const formData = new FormData();

      formData.append("title", modal.data.title);
      formData.append("content", modal.data.content);
      file?.file?.originFileObj && formData.append("media", file?.file?.originFileObj);
      !modal.data.id && formData.append("courseId",selectedCourseId);

      (modal?.data?.tags || []).forEach((tag) => {
        formData.append("tags[]", tag);
      });

      axios_01
        .post(`/api/post${modal.data.id ? `/${modal.data.id}` : ''}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            if (modal.data.id) {
              for (let i = 0; i < post.length; i++) {
                if (modal.data.id === response.data.id) {
                  post[i] = response.data;
                }
              }
            } else {
              post.unshift(response.data);
            }
            setPost(post);
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

  

  return (
  <>
    <Select  defaultValue={selectedCourseId}  style={{ width: '150px' }} onChange={handleChangeCourse}>
        {courses.map(course => (
          <Option key={course?.id} value={course?.id}>
            {course?.name}
          </Option>
        ))}
      </Select>
    <Card style={{ height: "100%" }}>
      <Button type="primary" onClick={toggleModal} style={{ marginBottom: 10 }}>
        + Post
      </Button>

      <Modal
        title="Add Post"
        open={modal.isOpen}
        onOk={submit}
        onCancel={toggleModal}
      >
        <Form style={{ marginTop: 10 }}>
          <Form.Item>
            <Input
              size="large"
              placeholder="Post Title"
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
            <TeachTags
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
              {file || (modal.data?.id && modal.data?.media?.split('post')[1]) ? (
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
          {!post ? (
            <> </>
          ) : (
            <List
              className="demo-loadmore-list"
              itemLayout="vertical"
              dataSource={post}
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
                    <Item item={item} mediaKey={'post'} />
                  </Card>
              }}
            />
            )}
      </div>
    </Card>
    </>
  );
};

export default TeachPosts;
