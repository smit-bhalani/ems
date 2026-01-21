import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Card, Flex } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate("/");

    return (
        <Flex align='center' justify='center' className='w-full vh-100'>
            <Card hoverable className='text-center' style={{ width: 300 }}>
                <p><ExclamationCircleOutlined className='text-danger fs-1' /></p>
                <h2>404</h2>
                <p className='fs-3'>Not Found!</p>
                <Button type='primary' onClick={() => navigate("/")}>Go to Home</Button>
            </Card>
        </Flex>
    )
}

export default NotFound