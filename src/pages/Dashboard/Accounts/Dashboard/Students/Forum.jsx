import  { React, useState,useEffect } from 'react';
import { axios_01 } from "../../../../../axios";
import {  useSelector } from "react-redux";
import { Card,List } from 'antd';


const StudentForum = () => {
    const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [question, setQuestion] = useState('');
  const toggleModal = () => setModal({ ...modal, isOpen: !modal.isOpen });
  const user = useSelector(function (state) {
    return state?.user;
  });
    useEffect(() => {
        axios_01.get(`/api/question?courseId=${user.course.id}`).then((response) => {
          console.log(response.data.questions);
          setQuestion(response.data.questions)
        }).catch(() => setQuestion([]));
      }, []);
    return (
        <Card  >
        {!question ? (
          <> </>
        ) : (
          <List style={{height:"100%"}}
            className="demo-loadmore-list"
            itemLayout="vertical"
            dataSource={question}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                //   avatar={<Avatar />}                
                  title={ item.userId}
                  description={item.title}               
                />
                {item.content}
                {/* {<EditOutlined/>} */}
                {/* {<DeleteOutlined/>}               */}
              </List.Item>
            )}
          />
        )}
      </Card>
    )
}


export default StudentForum;
