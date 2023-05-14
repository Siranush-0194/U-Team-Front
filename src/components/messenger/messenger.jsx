import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import { useState } from "react";

function Messenger() {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('User A');
const {form} = useForm();
  const onFinish = (values) => {
    const newMessage = { sender: sender, content: values.message };
    setMessages([...messages, newMessage]);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSenderChange = (newSender) => {
    setSender(newSender);
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <div className="sender-switcher">
          <Button onClick={() => handleSenderChange('User A')} disabled={sender === 'User A'}>User A</Button>
          <Button onClick={() => handleSenderChange('User B')} disabled={sender === 'User B'}>User B</Button>
        </div>
      </Header>
      {/* rest of the code... */}

      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <div className="message-list">
            {messages.map((message, index) => (
              <div key={index}>
                <p>{message.sender}: {message.content}</p>
              </div>
            ))}
          </div>
          <div className="message-form">
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="message"
                rules={[
                  {
                    required: true,
                    message: 'Please input your message!',
                  },
                ]}
              >
                <Input placeholder="Type your message..." />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>My Messenger App ©2023</Footer>
    </Layout>
  );
}

export default Messenger;
