import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const Notes = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleSubmit = async (values) => {
  //   setIsSubmitting(true);
  //   try {
  //     const response = await axios.post("/api/notes", values);
  //     console.log("Note created:", response.data);
  //     form.resetFields();
  //     // TODO: Display success message to the user
  //   } catch (error) {
  //     console.error("Error creating note:", error);
  //     // TODO: Display error message to the user
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <Form form={form} >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Content" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Create Note
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Notes;
