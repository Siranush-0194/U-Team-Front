import { React } from "react";
import { useEffect, useState } from "react";

import { Avatar, List, Card } from "antd";
import { useSelector } from "react-redux";

import axios from "../../../../../axios";

import "../../style.scss";

const Friends = () => {
  const [teachers, setTeachers] = useState(null);

  const user = useSelector(function (state) {
    return state?.user;
  });

  useEffect(() => {
    axios
      .get(`/api/course/get/${user.course.id}/teachers`)
      .then((response) => {
        setTeachers(response.data);
      })
      .catch(() => setTeachers([]));
  }, [user]);

  return (
    <Card className="list">
      {!teachers ? (
        <> </>
      ) : (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={teachers}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar />}
                title={item.firstName}
                description
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default Friends;
