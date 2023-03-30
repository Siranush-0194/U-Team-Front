import React, { useState, useEffect, useCallback } from "react";
import { axios_01 } from "../../../../../axios";
import { Input, Button, Collapse, List, Upload, Image, message } from "antd";
import useGetBase64 from "../../../../../hooks/useGetBase64";

import "./index.scss";

const { TextArea } = Input;
const { Panel } = Collapse;

function CommentForm({ question, onClick }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({
    data: [],
    next: question.commentsUrl,
  });
  const [active, setActive] = useState([]);
  const [file, setFile] = useState(null);

  const getBase64 = useGetBase64();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment?.length) {
      message.error("Please type comment");

      return;
    }

    const formData = new FormData();

    formData.append("content", comment);
    formData.append("questionId", question.id);
    file && formData.append("media", file.file.originFileObj);

    axios_01
      .post(`/api/comment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.id) {
          setComment("");
          setFile(null);

          setComments({
            ...comments,
            data: [response.data].concat(comments.data),
          });
        }
      });
  };

  const getComments = useCallback((commentsData) => {
    if (!commentsData.next) return;

    axios_01.get(commentsData.next).then((data) => {
      setComments({
        next: data.data.nextUrl,
        data: commentsData.data.concat(data.data.comments),
      });
    });
  }, []);

  useEffect(() => {
    if (active.length) {
      getComments(comments);
    }

    return () => {
      setComments({
        data: [],
        next: question.commentsUrl,
      });
    };
  }, [active.length]);

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
                extra={
                  item.media.split("comment")[1] ? (
                    <Image
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                      alt="logo"
                      src={item.media}
                    />
                  ) : null
                }
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

          {comments.next ? (
            <Button
              style={{ marginTop: 10 }}
              type="primary"
              onClick={() => getComments(comments)}
            >
              Load More
            </Button>
          ) : null}
        </Panel>
      </Collapse>

      <div className="form-comments">
        <div className="form-comments__content">
          <Upload
            name="media"
            listType="picture-card"
            className="media-uploader"
            beforeUpload={getBase64.beforeUpload}
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

          <TextArea
            showCount
            className="form-comments__content_textarea"
            maxLength={100}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="disable resize"
          />
        </div>

        <Button style={{ marginTop: 10 }} type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}

export default CommentForm;
