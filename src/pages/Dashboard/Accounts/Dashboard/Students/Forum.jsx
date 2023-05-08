import { React, useState, useCallback, useEffect } from "react";
import { axios_01 } from "../../../../../axios";
import { useSelector } from "react-redux";
import { Button, Card, List } from "antd";
import Item from "../../../../../components/Other/Item";
import { CommentOutlined } from "@ant-design/icons";
import Likes from "../Likes/Like";
import CommentForm from "../Comments/Comments";
import { useHistory } from "react-router-dom";

const StudentForum = () => {
  const [data, setData] = useState([]);
  const [commentIsOpen, setCommentIsOpen] = useState({});
  const [modal, setModal] = useState({ isOpen: false, data: {} });

  const history = useHistory();

  const user = useSelector(function (state) {
    return state?.user;
  });

  const getData = useCallback(() => {
    return new Promise((resolve, reject) => {
      axios_01
        .get(`/api/forum?courseId=${user.course.id}${(history.location.search || '').replace('?', "&")}`)
        .then((response) => {
          if (response.status === 200) {
            return resolve(response.data.data);
          }

          return resolve([]);
        })
        .catch((error) => reject(error));
    });
  }, [user.course.id, history.location.search]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  const getFilter = function (tag) {
    history.push({ search: tag ? `&filter=${tag}` : '' });
    getData().then((data) => setData(data));
  }

  return (
    <Card>
      <Button onClick={()=> getFilter()}>Clear Filter</Button>
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
                  <Likes id={item.id} likedByMe={item.likedByMe} likeCount={item.likes} />,
                  ...(item.commentsUrl ? [<CommentOutlined key='comment' onClick={() => setCommentIsOpen({
                    ...commentIsOpen,
                    [item.id]: !commentIsOpen[item.id]
                  })} />] : []),
                ]}>
                  <Item item={item} mediaKey={item.hasOwnProperty('commentsUrl') ? 'question' : 'post'} onClickTag={(tag) => getFilter(tag)} />
                </Card>

                <div style={{ marginTop: 10 }}>
                  {item.hasOwnProperty('commentsUrl') ? <CommentForm question={item} isOpen={commentIsOpen[item.id]} /> : null}
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
