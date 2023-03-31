import { React, useState, useCallback, useEffect } from "react";
import { axios_01 } from "../../../../../axios";
import { useSelector } from "react-redux";
import { Card, List, Typography } from "antd";
import CommentForm from "../Comments/Comments";
import Item from "../../../../../components/Other/Item";

const StudentForum = () => {
  const [data, setData] = useState([]);

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
          renderItem={(item) => (
              <Card key={item.id}>
                <Item item={item} />
              </Card>
          )}
        />
      )}
    </Card>
  );
};

export default StudentForum;
