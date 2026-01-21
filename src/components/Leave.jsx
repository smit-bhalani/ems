import { CalendarOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, DatePicker, Divider, Flex, Form, Input, Modal, Select, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import authStore from '../stores/authStore'
import { leaveData } from '../mock_data/leaveData'
import { users } from '../mock_data/users'

const { RangePicker } = DatePicker;

const Leave = () => {

    const { role, user } = authStore();
    const isAdmin = role === "admin";
    const isTeamLead = role === "teamlead";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const [leaveHistory, setLeaveHistory] = useState([]);

    useEffect(() => {
        if (isAdmin) {
            setLeaveHistory(leaveData);
        }
        else if (isTeamLead) {
            setLeaveHistory(
                leaveData.filter(
                    l => l.teamLead === user.id || l.userId === user.id
                )
            );
        }
        else {
            setLeaveHistory(
                leaveData.filter(l => l.userId === user.id)
            );
        }
    }, [role, user]);

    const handleApply = (values) => {
        const newLeave = {
            id: Date.now(),
            userId: user.id,
            teamLead: isTeamLead ? null : user.teamLead,
            type: values.type,
            startDate: values.dates[0].format('YYYY-MM-DD'),
            endDate: values.dates[1].format('YYYY-MM-DD'),
            reason: values.reason,
            status: "pending"
        };

        setLeaveHistory(prev => [newLeave, ...prev]);
        setIsModalOpen(false);
        form.resetFields();
    };

    const updateLeaveStatus = (id, status) => {
        setLeaveHistory(prev =>
            prev.map(l =>
                l.id === id ? { ...l, status } : l
            )
        );
    };

    const getEmployeeName = (userId) =>
        users.find(u => u.id === userId)?.name || "";

    const columns = [
        {
            title: 'Employee',
            dataIndex: 'userId',
            render: userId => getEmployeeName(userId),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search employee"
                        value={selectedKeys[0]}
                        onChange={e =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={confirm}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Flex gap={8}>
                        <Button
                            type="primary"
                            onClick={confirm}
                            icon={<SearchOutlined />}
                            size="small"
                        >
                            Search
                        </Button>
                        <Button
                            onClick={clearFilters}
                            size="small"
                        >
                            Reset
                        </Button>
                    </Flex>
                </div>
            ),
            filterIcon: filtered => (
                (isAdmin || isTeamLead) && <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
            ),
            onFilter: (value, record) =>
                getEmployeeName(record.userId)
                    .toLowerCase()
                    .includes(value.toLowerCase())
        },
        { title: 'Type', dataIndex: 'type' },
        { title: 'From', dataIndex: 'startDate' },
        { title: 'To', dataIndex: 'endDate' },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => (
                <Tag color={
                    status === 'approved'
                        ? 'success'
                        : status === 'rejected'
                            ? 'error'
                            : 'warning'
                }>
                    {status.toUpperCase()}
                </Tag>
            ),
            filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Approved', value: 'approved' },
                { text: 'Rejected', value: 'rejected' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        ...(isAdmin || isTeamLead ? [{
            title: 'Action',
            render: (_, record) =>
                record.status === 'pending' &&
                record.userId !== user.id && (
                    <Flex gap={8}>
                        <Button
                            size="small"
                            type="link"
                            onClick={() => updateLeaveStatus(record.id, 'approved')}
                        >
                            Approve
                        </Button>
                        <Button
                            size="small"
                            type="link"
                            danger
                            onClick={() => updateLeaveStatus(record.id, 'rejected')}
                        >
                            Reject
                        </Button>
                    </Flex>
                ) || "-"
        }] : [])
    ];

    return (
        <>
            <Divider>Leave Request</Divider>

            {
                !isAdmin && <Flex justify="end" className="mb-4">
                    <Button
                        type="primary"
                        icon={<CalendarOutlined />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Apply for Leave
                    </Button>
                </Flex>
            }

            <Card title="Leave History">
                <Table
                    bordered
                    dataSource={leaveHistory}
                    columns={columns}
                    rowKey="id"
                />
            </Card>

            <Modal
                centered
                title="Apply for Leave"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleApply}>
                    <Form.Item name="type" label="Leave Type" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="Sick Leave">Sick Leave</Select.Option>
                            <Select.Option value="Casual Leave">Casual Leave</Select.Option>
                            <Select.Option value="Paid Leave">Paid Leave</Select.Option>
                            <Select.Option value="Unpaid Leave">Unpaid Leave</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="dates" label="Duration" rules={[{ required: true }]}>
                        <RangePicker className="w-100" />
                    </Form.Item>

                    <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Submit Request
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default Leave