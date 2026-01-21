import { Card, Col, Divider, Row } from 'antd'
import ActivityList from '../../components/ActivityList'
import ProfileCard from '../../components/ProfileCard'
import { BorderlessTableOutlined, CodepenOutlined, DollarOutlined, PullRequestOutlined, UsergroupAddOutlined, WindowsOutlined } from '@ant-design/icons'
import { users } from '../../mock_data/users'
import { leaveData } from '../../mock_data/leaveData'
import AttendanceAction from '../../components/AttendanceAction'

const Dashboard = () => {

    const cardData = [
        {
            title: "Total Employee",
            icon: <UsergroupAddOutlined />,
            value: users.length,
            headerBg: 'skyblue'
        },
        {
            title: "Total Departments",
            icon: <CodepenOutlined />,
            value: 3,
            headerBg: 'lightgreen'
        },
        {
            title: "Total Projects",
            icon: <BorderlessTableOutlined />,
            value: 5,
            headerBg: 'lightpink'
        },
        {
            title: "Total Salary Paid",
            icon: <DollarOutlined />,
            value: users.reduce((acc, data) => acc + data.salary, 0),
            headerBg: 'burlywood'
        },
        {
            title: "Pending Leave Request",
            icon: <PullRequestOutlined />,
            value: leaveData.filter(l => l.status === "pending").length,
            headerBg: 'lightyellow'
        },
    ]

    return (
        <>
            <Divider>Dashboard</Divider>

            <Row gutter={[16, 16]} className='my-5'>
                {
                    cardData.map((item, i) => (
                        <Col xs={24} lg={12} xl={6}>
                            <Card
                                key={i}
                                title={item.title}
                                extra={item.icon}
                                hoverable
                                style={{ maxWidth: 300 }}
                                styles={
                                    {
                                        header: {
                                            background: item.headerBg,
                                        },
                                    }
                                }
                            >
                                <p className='m-0 fs-2'>{item?.value}</p>
                            </Card>
                        </Col>
                    ))
                }
            </Row>

            <AttendanceAction />

            <Row gutter={[16, 16]} className='mt-3'>
                <Col xs={24} lg={16}>
                    <ActivityList />
                </Col>
                <Col xs={24} lg={8}>
                    <ProfileCard />
                </Col>
            </Row>
        </>
    )
}

export default Dashboard