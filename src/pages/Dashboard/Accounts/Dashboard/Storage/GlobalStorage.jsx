import { React, useState, useEffect } from "react";
import { Form, Card, Modal, Button, Input, List, Avatar } from "antd";
import { axios_01, axios_02 } from "../../../../../axios";
import { useSelector } from "react-redux";
import { Upload } from "antd";
import useGetBase64 from '../../../../../hooks/useGetBase64';

const UploadForm = () => {
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [post, setPost] = useState([]);
  const [file, setFile] = useState(null);

  const getBase64 = useGetBase64();

  const user = useSelector(function (state) {
    return state?.user;
  });
  
  // useEffect(() => {
  //   axios_02
  //     .get(`/api/post?courseId=${user.course.id}`)
  //     .then((response) => {
  //       setPost(response.data.posts);
  //     })
  //     .catch(() => setPost([]));
  // }, [user.course.id]);

  const toggleModal = () => {
    setModal({ ...modal, isOpen: !modal.isOpen });
    setFile(null);
  }

  const submit = () => {
    if (modal.data.title) {
      const formData = new FormData();

      // formData.append("file", modal.data.title);
      formData.append("type", modal.data.type);
      formData.append("media", file.file.originFileObj);
      formData.append("courseId", user.course.id);

      axios_02
        .post(
          `/api/post`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            post.unshift(response.data);
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
      file: data.file
    });
  };

  return (
    <Card style={{ height: "100%" }}>
      <Form>
      

        <Modal
          title="Add File"
          open={modal.isOpen}
          onOk={submit}
          onCancel={toggleModal}
        >
          <Input
            style={{ gap: 10 }}
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
            beforeUpload={getBase64.beforeUploadMedia}
            customRequest={handleUpload}
            onChange={handleChange}
            onPreview={handlePreview}
            fileList={file?.fileList || []}
            maxCount={1}
          >
            {file ? (
              <img src={file?.file?.preview} alt="media" style={{ width: "100%" }} />
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
        }}
      >
        <Card>
          {!post ? (
            <> </>
          ) : (
            <List
              className="demo-loadmore-list"
              itemLayout="vertical"
              dataSource={post}
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
    </Card>
  );
};

export default UploadForm;
