import { React } from "react";
import { useEffect, useState } from "react";
import axios from "../../../../../axios";

import { Avatar, List, Card, Table } from "antd";
import "../../style.scss";
import { useParams, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";

const Friends = () => {
  const [teachers, setTeachers] = useState(null);
  const { courseId } = useParams();
  //   const form = Form.useForm()

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
