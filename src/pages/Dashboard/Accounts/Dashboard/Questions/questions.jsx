import { React, useState } from "react";
import { FloatButton, Form, Card, Modal, Button, Input } from "antd";
import axios, { axios_01 } from "../../../../../axios";
import { useDispatch, useSelector } from "react-redux";

const Questions = () => {
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [question, setQuestion] = useState();
  const dispatch = useDispatch();

  const toggleModal = () => setModal({ ...modal, isOpen: !modal.isOpen });

  const user = useSelector(function (state) {
    return state?.user;
  });

  const submit = () => {
    console.log(1);
    if (modal.data.title) {
      axios_01
        .post(`/api/question`, { ...modal.data, courseId: user.course.id })
        .then((response) => {
          if (response.status === 201) {
            setQuestion(question.concat(response.data));

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
    <Card>
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
    </Card>
  );
};

export default Questions;
