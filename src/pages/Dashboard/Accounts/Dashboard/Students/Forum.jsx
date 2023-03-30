import { React, useState, useCallback, useEffect } from "react";
import { axios_01 } from "../../../../../axios";
import { useSelector } from "react-redux";
import { Card, List, Typography } from "antd";
import CommentForm from "../Comments/Comments";
import useRandomMerge from "../../../../../hooks/useRandomMerge";

const StudentForum = () => {
  const [data, setData] = useState([]);

  const randomMerge = useRandomMerge();
  const user = useSelector(function (state) {
    return state?.user;
  });

  const getData = useCallback(() => {
    const getQuestions = new Promise((resolve, reject) => {
      axios_01
        .get(`/api/question?courseId=${user.course.id}`)
        .then((response) => resolve(response.data.questions))
        .catch(() => resolve([]));
    });

    const getPosts = new Promise((resolve, reject) => {
      axios_01
        .get(`/api/post?courseId=${user.course.id}`)
        .then((response) => resolve(response.data.posts))
        .catch(() => resolve([]));
    });

    return Promise.all([getQuestions, getPosts]).then((data) => {
      return Promise.resolve(randomMerge(data[0], data[1]));
    });
  }, [user.course.id, randomMerge]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <Card>
      {data && (
        <List
          className="demo-loadmore-list"
          itemLayout="vertical"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card>
                <List.Item.Meta
                  title={item.user.firstName}
                  description={item.title}
                />

                <Typography>
                  <Typography.Text strong>{item.content}</Typography.Text>
                </Typography>

                <img
                  src={item.media}
                  alt="logo"
                  style={{ width: 300, height: 300, objectFit: "cover" }}
                />

                {item.commentsUrl ? <CommentForm question={item} /> : null}
              </Card>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default StudentForum;
