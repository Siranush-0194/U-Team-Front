import React, { useState, useEffect, useCallback } from "react";
import { axios_01 } from "../../../../../axios";
import { Input, Button, Collapse, List, IconText, Avatar } from "antd";

const { TextArea } = Input;
const { Panel } = Collapse;

function CommentForm({ question, onClick }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({ data: [], next: question.commentsUrl });
  const [active, setActive] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment?.length) return;

    const formData = new FormData();

    formData.append("content", comment);
    formData.append("questionId", question.id);

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
        data: comments.data.concat(data.data.comments)
      });
    });
  }, [comments]);

  useEffect(() => {
    if (active.length) {
      getComments();
    }
  }, [getComments, active.length]);

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
                    <img
                      width={100}
                      alt="logo"
                      src={item.media}
                    />
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
        </Panel>
      </Collapse>

      <TextArea
        showCount
        maxLength={100}
        style={{ marginTop: 10, height: 120, resize: "none" }}
        onChange={(e) => setComment(e.target.value)}
        placeholder="disable resize"
      />

      <Button style={{ marginTop: 10 }} type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default CommentForm;
