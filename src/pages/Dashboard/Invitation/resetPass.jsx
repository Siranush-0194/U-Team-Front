import React, {useState, useEffect} from "react";
import {Input, Form, Button, Card} from "antd";
import axios from "../../../axios";
import useQuery from "../../../hooks/useQuery";
import "./style.scss";

const ResetPassword = () => {
    const query = useQuery();
    const [form] = Form.useForm();
    const [user, setUser] = useState(null);
    const [token] = useState(query.get("token"));

    useEffect(() => {
        axios.get(`accept/invitation?token=${token}`)
            .then((response) => {
                console.log(response)
                let user = response.data[0];
                if (response.status === 404) {
                    window.location.href = "/";
                }
                try {
                    user.payload = JSON.parse(user.payload);

                    setUser({
                        ...user,
                        ...user.payload,
                    });
                } catch (e) {
                    //
                }
            })

            .catch((e) => {
                    if (e.response.status === 404) {
                        window.location.href = "/";
                    }
                    setUser([token])
                }
            );
    }, [token]);

    const onFinish = (values) => {
        values.token = token;
        values.password_confirmation = values.confirm;

        delete values.confirm;

        axios
            .post("/accept/invitation", values)
            .then((Jsonresponse) => {
                console.log('  post accept/invitation  ')
                window.location.href = "/";
                form.resetFields();
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    let fields = ["password", "confirm"];
                    fields.forEach((field) => {
                        if (error.response.data.errors[field]) {
                            form.setFields([
                                {
                                    name: field,
                                    errors: error.response.data.errors[field],
                                },
                            ]);
                        }
                    });
                }
            });
    };

    return (
        <>
            <img
                src="../images/Uteam.jpeg"
                className="logo"
                alt="logo"
                width={100}
                height={100}
            />
            {!user ? (
                <></>
            ) : (
                <Card
                    className="resetCard"
                    title={user.firstName + " " + user.lastName + " " + user.email}
                    style={{width: 600, gap: 10}}
                >
                    <Form form={form} onFinish={onFinish}>
                        <Form.Item name="password" label="Password">
                            <Input.Password className='passwordInput'/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"

                        >
                            <Input.Password className='passwordInput'/>
                        </Form.Item>
                        <Form.Item>
                            <Button className="register" type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            )}
        </>
    );
};

export default ResetPassword;
