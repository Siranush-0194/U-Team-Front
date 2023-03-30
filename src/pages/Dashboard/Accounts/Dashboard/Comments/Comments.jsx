import React, { useState, useEffect, useCallback } from "react";
import { axios_01 } from "../../../../../axios";
import { Input, Button, Collapse, List, Upload, message } from "antd";

const { TextArea } = Input;
const { Panel } = Collapse;

const getBase64 = (data) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function CommentForm({ question, onClick }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({
    data: [],
    next: question.commentsUrl,
  });
  const [active, setActive] = useState([]);
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment?.length) return;

    const formData = new FormData();

    formData.append("content", comment);
    formData.append("questionId", question.id);
    console.log(comments.media);
    formData.append("media", comments.media)

    axios_01
      .post(`/api/comment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.id) {
          setComment("");
          console.log(response.data);
        }
      });
  };

  const getComments = useCallback(() => {
    if (!comments.next) return;

    axios_01.get(comments.next).then((data) => {
      setComments({
        next: data.data.nextUrl,
        data: comments.data.concat(data.data.comments),
      });
    });
  }, [comments]);


  useEffect(() => {
    if (active.length) {
      getComments();
    }
  }, [getComments, active.length]);

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
    <>
      <Collapse
        defaultActiveKey={active}
        onChange={(value) => setActive(value)}
      >
        <Panel header="Comments" key="1">
          <List
            itemLayout="vertical"
            size="small"
            dataSource={comments.data}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[]}
                extra={<img width={100} alt="logo" src={item.media} />}
              >
                <List.Item.Meta
                  // avatar={<Avatar src={item.user} />}
                  title={`${item.user.firstName} ${item.user.lastName}`}
                  description={item.user.role}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>

      <TextArea
        showCount
        maxLength={100}
        style={{ marginTop: 10, height: 120, resize: "none" }}
        onChange={(e) => setComment(e.target.value)}
        placeholder="disable resize"
      />
      <Upload
        style={{ marginTop: 10 }}
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

      <Button style={{ marginTop: 10 }} type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default CommentForm;
