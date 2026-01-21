import { Card, Col, Divider, Row } from 'antd'
import ActivityList from '../../components/ActivityList'
import ProfileCard from '../../components/ProfileCard'
import { ClockCircleOutlined, CodepenOutlined, PullRequestOutlined } from '@ant-design/icons'
import authStore from '../../stores/authStore'
import { calculatePendingLeaves } from '../../utils/calculatedLeave'
import AttendanceAction from '../../components/AttendanceAction'

const Dashboard = () => {

    const { user } = authStore();

    const cardData = [
        {
            title: "Attendance",
            icon: <ClockCircleOutlined />,
            value: "95%",
            headerBg: 'skyblue'
        },
        {
            title: "Pending Task",
            icon: <CodepenOutlined />,
            value: 5,
            headerBg: 'lightgreen'
        },
        {
            title: "Pending Leave Request",
            icon: <PullRequestOutlined />,
            value: calculatePendingLeaves(user.id),
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