import { Button, Card, Divider, Flex, Form, Input, Modal, Table, Tag } from 'antd'
import React, { useState } from 'react'
import authStore from '../stores/authStore'
import { MessageOutlined } from '@ant-design/icons';
import { queryData } from '../mock_data/queryData';
import { users } from '../mock_data/users';

const statusColorMap = {
    pending: 'orange',
    resolved: 'green',
};

const Query = () => {

    const { role, user } = authStore();
    const isAdmin = role === "admin";
    const [form] = Form.useForm();
    const [resolveForm] = Form.useForm();
    const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState(null);

    const columns = [
        ...(isAdmin ? [{ title: 'Employee', dataIndex: 'userId', render: _ => getEmployeeName(_) }] : []),
        { title: 'Date', dataIndex: 'date' },
        { title: 'Subject', dataIndex: 'subject' },
        { title: 'Description', dataIndex: 'description', ellipsis: true },
        { title: 'Status', dataIndex: 'status', render: s => <Tag color={statusColorMap[s] || 'default'}>{s}</Tag> },
        { title: 'Reply', dataIndex: 'reply', ellipsis: true },
        ...(isAdmin ? [{
            title: 'Action',
            render: (_, record) => record.status === 'pending' && (
                <Button type="link" onClick={() => openResolveModal(record)}>Resolve</Button>
            )
        }] : [])
    ];

    const getEmployeeName = (userId) =>
        users.find(u => u.id === userId)?.name || "";

    const openResolveModal = (record) => {
        setSelectedQuery(record);
        setIsResolveModalOpen(true);
    }

    const handleAdd = (values) => {
        const newQuery = {
            id: Date.now(),
            userId: user.id,
            name: user.name,
            date: new Date().toISOString().split('T')[0],
            subject: values.subject,
            description: values.description,
            status: 'pending',
            reply: ''
        };

        queryData.unshift(newQuery);
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleResolve = (values) => {
        const index = queryData.findIndex(q => q.id === selectedQuery.id);
        if (index !== -1) {
            queryData[index].status = 'resolved';
            queryData[index].reply = values.reply;
        }
        setIsResolveModalOpen(false);
        resolveForm.resetFields();
    };

    return (
        <>
            <Divider>Query</Divider>
            {
                !isAdmin && <Flex justify='end' className='mb-4'>
                    <Button type='primary' icon={<MessageOutlined />} onClick={() => setIsModalOpen(true)}>Raise Query</Button>
                </Flex>
            }
            <Card title={isAdmin ? "All Employee Queries" : "My Queries"}>
                <Table
                    dataSource={queryData.filter(q => {
                        if (isAdmin) return true;
                        return q.userId === user.id;
                    })}
                    columns={columns}
                    rowKey="id"
                />
            </Card>

            <Modal centered title="Raise a Query" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleAdd}>
                    <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
                        <Input placeholder="e.g. Salary Issue" />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea rows={4} placeholder="Describe your issue..." />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>Submit Query</Button>
                </Form>
            </Modal>

            <Modal title="Resolve Query" open={isResolveModalOpen} onCancel={() => setIsResolveModalOpen(false)} footer={null}>
                <Form form={resolveForm} layout="vertical" onFinish={handleResolve}>
                    <Card className='my-4'>
                        <p className='mb-1'>Subject</p>
                        <p className='text-secondary'>{selectedQuery?.subject}</p>
                        <p className='mb-1'>Description</p>
                        <p className='text-secondary m-0'>{selectedQuery?.description}</p>
                    </Card>
                    <Form.Item name="reply" label="Admin Reply" rules={[{ required: true }]}>
                        <Input.TextArea rows={5} placeholder="Enter resolution details..." />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>Mark as Resolved</Button>
                </Form>
            </Modal>
        </>
    )
}

export default Query