import { DashboardFilled, DashboardTwoTone, InteractionOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Typography, message } from 'antd'
import React from 'react'
import authStore from '../stores/authStore';
import { Navigate } from 'react-router-dom';
import { users } from '../mock_data/users';

const Login = () => {

    const { isAuthenticated, role, login } = authStore();

    if (isAuthenticated && role) {
        return <Navigate to={`${role}/dashboard`} />
    }

    const onFinish = (values) => {
        const user = users.find(user => {
            return user.email === values.email && user.password === values.password
        });

        if (user) {
            message.success('Login Successful!');
            login(user);
            return <Navigate to={`${user.role}/dashboard`} />;
        } else {
            message.error('Invalid Credentials!');
        }
    }

    return (
        <Flex className='w-full vh-100' align='center' justify='center'>
            <Form
                layout="vertical"
                className="login-form shadow rounded p-4"
                style={{ width: 400 }}
                onFinish={onFinish}
            >
                <Flex justify='center'><InteractionOutlined className='fs-2 mb-2' rotate={30} /></Flex>
                <Typography.Title level={5} className="mb-3 text-center">Employee Managment System</Typography.Title>
                <hr />
                <Form.Item
                    label="Email"
                    name='email'
                    rules={[
                        {
                            type: "email",
                            required: true,
                            message: "Please enter valid email!"
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: "Please enter password!",
                            min: 6
                        }
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-100 mt-2"
                // loading={disabledLoginBtn}
                >
                    Login
                </Button>
                <div className='border rounded bg-secondary-subtle text-secondary p-2 mt-3'>
                    <Typography.Title level={5} className='text-secondary'>Demo Credentials</Typography.Title>
                    <p className='mb-1 small'>ADMIN : admin@ems.com / 123456</p>
                    <p className='mb-1 small'>TEAM LEAD : lead@ems.com / 123456</p>
                    <p className='mb-1 small'>EMPLOYEE : employee@ems.com / 123456</p>
                </div>
            </Form>
        </Flex>
    )
}

export default Login