import { React, useState, useCallback, useEffect } from "react";
import { axios_01 } from "../../../../../axios";
import { useSelector } from "react-redux";
import { Card, List } from "antd";
import Item from "../../../../../components/Other/Item";
import { CommentOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Likes from "../Likes/Like";
import CommentForm from "../Comments/Comments";

const StudentForum = () => {
  const [data, setData] = useState([]);
  const [commentIsOpen, setCommentIsOpen] = useState({});

  const user = useSelector(function (state) {
    return state?.user;
  });

  const getData = useCallback(() => {
    return new Promise((resolve, reject) => {
      axios_01
        .get(`/api/forum?courseId=${user.course.id}`)
        .then((response) => {
          if (response.status === 200) {
            return resolve(response.data.data);
          }

          return resolve([]);
        })
        .catch((error) => reject(error));
    });
  }, [user.course.id]);

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
          renderItem={(item) => {
            return <>
              <Card
                style={{ marginTop: 10 }}
                key={item.id}>
                <Card actions={[
                  <Likes id={item.id} likedByMe={item.likedByMe} />,
                  <EditOutlined />,
                  <CommentOutlined key='comment' onClick={() => setCommentIsOpen({
                    ...commentIsOpen,
                    [item.id]: !commentIsOpen[item.id]
                  })} />,
                  <DeleteOutlined key="delete" style={{ color: 'red' }} />,
                ]}>
                  <Item item={item} mediaKey={'question'} />
                </Card>

                <div style={{ marginTop: 10 }}>
                  {item.commentsUrl ? <CommentForm question={item} isOpen={commentIsOpen[item.id]} /> : null}
                </div>
              </Card>
            </>
          }}
        />
      )}
    </Card>
  );
};

export default StudentForum;
