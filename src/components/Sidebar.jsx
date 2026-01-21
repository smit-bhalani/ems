import { AppstoreOutlined, CalendarOutlined, ClockCircleOutlined, DollarCircleOutlined, FieldTimeOutlined,  LeftOutlined, QuestionCircleOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authStore from '../stores/authStore';

const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false);
    const selectedMenu = window.location.pathname.split("/")[2];
    const navigate = useNavigate();
    const { role } = authStore();

    const items = [
        {
            key: 'dashboard',
            icon: <AppstoreOutlined />,
            label: 'Dashboard',
            onClick: () => navigate(`/${role}/dashboard`)
        },
        {
            key: 'attendance',
            icon: <ClockCircleOutlined />,
            label: 'Attendance',
            onClick: () => navigate(`/${role}/attendance`)
        },
        {
            key: "calendar",
            icon: <CalendarOutlined />,
            label: 'Calendar',
            onClick: () => navigate(`/${role}/calendar`)
        },
        {
            key: "leave",
            icon: <FieldTimeOutlined />,
            label: 'Leave',
            onClick: () => navigate(`/${role}/leave`)
        },
        {
            key: "salary",
            icon: <DollarCircleOutlined />,
            label: 'Salary',
            onClick: () => navigate(`/${role}/salary`)
        },
        ["admin", "teamlead"].includes(role) && {
            key: 'employees',
            icon: <UserOutlined />,
            label: 'Employees',
            onClick: () => navigate(`/${role}/employees`)
        },
        {
            key: 'query',
            icon: <QuestionCircleOutlined fontSize={20} />,
            label: 'Query',
            onClick: () => navigate(`/${role}/query`)
        },
    ].filter(Boolean);

    return (
        <Sider
            collapsible
            trigger={null}
            collapsed={collapsed}
            onCollapse={value => setCollapsed(value)}
            theme='light'
            breakpoint="md"
            width={250}
            className='overflow-auto p-2 shadow'
        >
            <Button
                icon={collapsed ? <RightOutlined fontSize={20} /> : <LeftOutlined fontSize={20} />}
                onClick={() => setCollapsed(prev => !prev)}
                block
                style={{ padding: '1.5rem', marginBottom: '10px' }}
            />
            <Menu
                selectedKeys={[selectedMenu]}
                mode="inline"
                items={items}
                className='border-0'
            />
        </Sider>
    )
}

export default Sidebar