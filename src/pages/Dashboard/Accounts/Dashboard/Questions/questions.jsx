import { React, useState, useEffect, Upload } from "react";
import {  Form, Card, Modal, Button, Input, List, Avatar } from "antd";
import { axios_01 } from "../../../../../axios";
import {  useSelector } from "react-redux";
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';

const Questions = () => {
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [question, setQuestion] = useState([]);


  const toggleModal = () => setModal({ ...modal, isOpen: !modal.isOpen });

  const user = useSelector(function (state) {
    return state?.user;
  });

  useEffect(() => {
    axios_01.get(`/api/question?courseId=${user.course.id}`).then((response) => {
      setQuestion(response.data.questions)
    }).catch(() => setQuestion([]));
  }, []);

  // const handleUpload =  () => 
  //   const formData = new FormData();
  //   formData.append('file', file);
    
  const submit = () => {
    console.log(1);
    if (modal.data.title) {
      axios_01      
        .post(`/api/question`, { ...modal.data, courseId: user.course.id },{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.status === 201) {
            question.unshift(response.data);
            setQuestion(question);
            setModal({ isOpen: false, data: {} });
          } else {
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Card style={{height:"100%"}}>
      <Form>
        <Button type="primary" onClick={toggleModal}>
          + Question
        </Button>

        

        <Modal
          title="Add Question"
          open={modal.isOpen}
          onOk={submit}
          onCancel={toggleModal}
        >
 
          <Input
            style={{ gap: 10 }}
            placeholder="Question Title"
            value={modal?.data?.title}
            onChange={(event) => {
              setModal({
                ...modal,
                data: {
                  ...modal.data,
                  title: event.target.value,
                },
              });
            }}
          />
          <Input
            placeholder="Content"
            value={modal?.data?.content}
            onChange={(event) => {
              setModal({
                ...modal,
                data: {
                  ...modal.data,
                  content: event.target.value,
                },
              });
            }}
          />
        </Modal>
      </Form>
      <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      
      
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
                avatar={<Avatar />}                
                title={ user.firstName}
                description={item.title}               
              />
              {item.content}
              {/* {<EditOutlined/>}
              {<DeleteOutlined/>}               */}
            </List.Item>
          )}
        />
      )}
    </Card>
 
    </div>
    </Card>
  );
};

export default Questions;