import React, { useEffect, useState } from "react";
import axios from "../../../../../axios";
import { useSelector } from "react-redux";
import { Avatar, Card, List } from "antd";



const Studyies = () => {
    const user = useSelector(function (state) {
        return state?.user;
      });
      const [students, setStudents] = useState();
    useEffect(() => {
        axios
          .get(`/api/course/get/${user.course.id}/students`)
          .then((response) => {
            // setStudents(response.data);
            console.log(response);
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
                    // avatar={<Avatar />}
                    title={item.firstName + " " + item.lastName}
                    description
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      );
}


export default Studyies;



