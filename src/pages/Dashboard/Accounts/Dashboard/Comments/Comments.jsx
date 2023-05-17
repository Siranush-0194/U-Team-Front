import React, { useState, useEffect, useCallback } from "react";
import { axios_01 } from "../../../../../axios";
import { Input, Button, Collapse, List, Upload, Image, message, Avatar } from "antd";
import useGetBase64 from "../../../../../hooks/useGetBase64";

import "./index.scss";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Panel } = Collapse;

function CommentForm({ question, onClick, isOpen }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({
    data: [],
    next: question.commentsUrl,
  });
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [replyParentId, setReplyParentId] = useState(null);

  const [active, setActive] = useState([]);
  const [file, setFile] = useState(null);

  const getBase64 = useGetBase64();
  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment?.length) {
      message.error("Please type a comment");
      return;
    }

    formData.append("content", comment);
    formData.append("questionId", question.id);
    formData.append("parentId", replyParentId); // Add parent ID for comment reply
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
          setReplyParentId(null);

          setComments({
            ...comments,
            data: [response.data, ...comments.data],
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

  const [rateLoading, setRateLoading] = useState(false);

  const submitRate = (value, rate, index) => {
    if (rateLoading) return;
    setRateLoading(true);
    axios_01
      .put("/api/comment-rate/", {
        commentId: comments.data[index].id,
        value,
      })
      .then((response) => {
        setRateLoading(false);
        if (response.status === 200) {
          const comment = { ...comments };

          comment.data[index].ratedByMe = response.data;

          if (rate === -1) {
            comment.data[index].rate = comments.data[index].rate - 1;
          } else {
            comment.data[index].rate = comments.data[index].rate + 1;
          }

          setComments(comment);
        }
      })
      .catch(() => setRateLoading(false));
  };

  const deleteComment = (id) => {
    axios_01
      .delete(`/api/comment/${id}`)
      .then((response) => {
        const updatedComments = comments.data.filter(
          (comment) => comment.id !== id
        );
        setComments({ ...comments, data: updatedComments });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showReplyForm = (parentId) => {
    setReplyParentId(parentId);
  };
  const renderComments = () => {
    return comments.data.map((item, index) => (
      <List.Item
        key={item.id}
        actions={[
          <Button
            type="link"
            onClick={() => showReplyForm(item.id)}
            key="reply"
          >
            {item.id}
          </Button>,
        ]}
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
        <div
          style={{
            display: "flex",
            flex: 1,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              display: "grid",
              justifyContent: "space-between",
            }}
          >
            <UpOutlined
              style={{
                display: "block",
                color: item.ratedByMe === 1 ? "gray" : "inherit",
              }}
              onClick={() => {
                if (item.ratedByMe !== 1) {
                  submitRate(item.ratedByMe + 1, 1, index);
                }
              }}
              disabled={item.ratedByMe === 1}
            />
            <span style={{ display: "flex", justifyContent: "center" }}>
              {item.rate}
            </span>
            <DownOutlined
              style={{
                display: "block",
                color: item.ratedByMe === -1 ? "gray" : "inherit",
              }}
              onClick={() => {
                if (item.ratedByMe !== -1) {
                  submitRate(item.ratedByMe - 1, -1, index);
                }
              }}
              disabled={item.ratedByMe === -1}
            />
          </div>
          <div style={{ width: "100%" }}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined/>} src={item?.author?.thumbnail}/>}
              title={`${item.author.firstName} ${item.author.lastName}`}
              description={item.author.role}
            />
            <div style={{ gap: 10, margin: 10 }}>{item.content}</div>
          </div>
        </div>
        <DeleteOutlined onClick={() => deleteComment(item.id)} />
        <EditOutlined key="edit" />
        {replyParentId === item.id && (
          <ReplyForm
            commentId={item.id}
            parentId={replyParentId}
            setReplyParentId={setReplyParentId}
            onSuccess={() => {
              getComments(comments);
            }}
          />
        )}
      </List.Item>
    ));
  };

  const ReplyForm = ({ commentId, parentId, setReplyParentId, onSuccess }) => {
    const [reply, setReply] = useState("");

    const handleReplySubmit = (e) => {
      e.preventDefault();

      if (!reply?.length) {
        message.error("Please type a reply");
        return;
      }

      const replyFormData = new FormData();
      replyFormData.append("content", reply);
      replyFormData.append("questionId", question?.id);
      // replyFormData.append("commentId", commentId);
      replyFormData.append("parentId", parentId);

      axios_01
        .post(`/api/comment`, replyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.id) {
            setReply("");
            setReplyParentId(null);
            setComments(comments)
            onSuccess();
          }
        });
    };

    return (
      <form onSubmit={handleReplySubmit} className="reply-form">
        <TextArea
          showCount
          className="form-comments__content_textarea"
          maxLength={100}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Reply to this comment"
        />
        <Button style={{ marginTop: 10 }} type="primary" htmlType="submit">
          Reply
        </Button>
      </form>
    );
  };

  return (
    <>
      <Collapse defaultActiveKey={active} onChange={(value) => setActive(value)}>
        <Panel header="Comments" key="1">
          <List itemLayout="vertical" size="small" dataSource={comments.data}>
            {renderComments()}
          </List>

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

      {isOpen && (
        <div className="form-comments">
          <div className="form-comments__content">
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
                <img
                  src={file?.file?.preview}
                  alt="media"
                  className="image-upload"
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
      )}
    </>
  );
}

export default CommentForm;
