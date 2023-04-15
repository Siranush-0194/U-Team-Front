import { React } from "react";
import { useEffect, useState } from "react";

import { Avatar, List, Card } from "antd";
import { useSelector } from "react-redux";

import axios from "../../../../../axios";

import "../../style.scss";

const Courses = () => {
  const [course, setCourses] = useState(null);



  useEffect(() => {
    axios
      .get(`/api/teacher/courses`)
      .then((response) => {
        setCourses(response.data);
        // console.log(response.data[0]);
      })
      .catch(() => setCourses([]));
  }, []);

  return (
    <Card className="list">
      {!course? (
        <> </>
      ) : (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={course}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.degree + " " + item.number + " " + item.type}
                description
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default Courses;
