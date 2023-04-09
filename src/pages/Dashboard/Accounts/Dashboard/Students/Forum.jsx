import { React, useState, useCallback, useEffect } from "react";
import { axios_01 } from "../../../../../axios";
import { useSelector } from "react-redux";
import { Card, List} from "antd";
import Item from "../../../../../components/Other/Item";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Likes from "../Likes/Like";

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
          renderItem={(item) => {
            return <Card  actions={[
              <Likes id={item.id} likedByMe={item.likedByMe}/>,
              <EditOutlined/>,              
              <DeleteOutlined key="delete" style={{ color: 'red' }} />,
            ]}>
               <Card key={item.id}>
                <Item item={item} mediaKey={'question'} />
              </Card>
            </Card>             
          }}
        />
      )}
    </Card>
  );
};

export default StudentForum;
