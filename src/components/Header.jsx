import { InteractionOutlined, LogoutOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Grid, Popconfirm, Typography } from 'antd'
import React from 'react'
import authStore from '../stores/authStore'

const { useBreakpoint } = Grid;

const Header = () => {

    const { logout, user } = authStore();
    const screens = useBreakpoint();

    return (
        <Flex justify='space-between' align='center' className='px-4 py-3 border bg-white'>
            <Flex align='center' gap={20}>
                <InteractionOutlined className='fs-2 mb-2' rotate={30} />
                {screens.sm && <Typography.Text>Employee Management System</Typography.Text>}
            </Flex>
            <Flex align='center' gap='1rem'>
                <Flex vertical align='flex-end'>
                    <p className='m-0 text-capitalize'>{user?.name}</p>
                    <p className='m-0 small text-secondary'>{user?.department}</p>
                </Flex>
                <Avatar className='bg-dark'>{user?.name?.split(" ").map(w => w[0]).join("")}</Avatar>
                <Popconfirm
                    title="Are you sure to logout?"
                    placement='bottomLeft'
                    onConfirm={logout}
                >
                    <Button type='primary' icon={<LogoutOutlined />} />
                </Popconfirm>
            </Flex>
        </Flex>
    )
}

export default Header