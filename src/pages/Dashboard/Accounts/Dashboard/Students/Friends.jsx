import { React } from "react";
import { useEffect, useState } from "react";

import { Avatar, List, Card } from "antd";
import { useSelector } from "react-redux";

import axios from "../../../../../axios";

import "../../style.scss";

const Friends = () => {
  const [students, setStudents] = useState(null);

  const user = useSelector(function (state) {
    return state?.user;
  });

  useEffect(() => {
    axios
      .get(`/api/course/get/${user.course.id}/students`)
      .then((response) => {
        setStudents(response.data);
        // console.log(response.data[0]);
      })
      .catch(() => setStudents([]));
  }, [user]);

  return (
    <Card className="list">
      {!students ? (
        <> </>
      ) : (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={students}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar />}
                title={item.firstName + " " + item.lastName}
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
