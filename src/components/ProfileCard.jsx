import { Avatar, Card, Divider, Flex, Tag } from 'antd'
import authStore from '../stores/authStore'
import  { calculateLeaveBalance } from '../utils/calculatedLeave';

const ProfileCard = () => {

    const { user } = authStore();

    return (
        <Card title="My Profile" hoverable>
            <Flex align='center' gap={15}>
                <Avatar size={64} style={{ backgroundColor: '#f56a00' }}>{user?.name?.split(" ")?.map(w => w[0])?.join("")}</Avatar>
                <Flex vertical align='start' justify='center'>
                    <h5>{user?.name}</h5>
                    <p className='m-0'>{user?.department}</p>
                </Flex>
            </Flex>
            <Divider dashed />
            <Flex justify='space-between' align='center'>
                <span>Salary:</span>
                <strong>{user?.salary} /-</strong>
            </Flex>
            <Flex justify='space-between' align='center'>
                <span>Personal Leave Balance:</span>
                <Tag color="gold">{calculateLeaveBalance(user.id) || "-"} Days</Tag>
            </Flex>
        </Card>
    )
}

export default ProfileCard