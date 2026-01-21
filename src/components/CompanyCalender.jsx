import { useState } from 'react'
import { Button, Calendar, Card, DatePicker, Divider, Flex, Form, Input, Modal } from 'antd'
import authStore from '../stores/authStore'
import adminStore from '../stores/adminStore'

const CompanyCalender = () => {

    const { role } = authStore();
    const { holidays, addHoliday, removeHoliday } = adminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const isAdmin = role === "admin";

    const disableWeekends = (current) => {
        const day = current.day()
        return day === 0 || day === 6
    }

    const handleApply = (values) => {
        const dateKey = values.date.format("YYYY-MM-DD")
        addHoliday({ key: dateKey, reason: values.reason })
        form.resetFields()
        setIsModalOpen(false)
    }

    const dateCellRender = (value) => {
        const date = value.format("YYYY-MM-DD")
        const day = value.day()

        const isWeekend = day === 0 || day === 6
        const holiday = holidays[date]

        return (
            <div>
                {holiday && (
                    <Flex style={{ color: "blue", fontSize: 12 }} gap={5} align='center'>
                        <span>{holiday}</span>
                        {isAdmin && <Button type='text' className='p-1' onClick={() => removeHoliday(date)}>x</Button>}
                    </Flex>
                )}

                {isWeekend && (
                    <div style={{ color: "red", fontSize: 12 }}>
                        Weekend Holiday
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <Divider>Comapany Calendar & Leaves</Divider>

            {role === "admin" && (
                <Flex justify="end" className="mb-4">
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>
                        Add Holiday
                    </Button>
                </Flex>
            )}

            <Card hoverable>
                <Calendar cellRender={dateCellRender} />
            </Card>

            <Modal centered title="Add Holiday" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleApply}>
                    <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                        <DatePicker disabledDate={disableWeekends} className='w-100' />
                    </Form.Item>
                    <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>Submit Request</Button>
                </Form>
            </Modal>
        </>
    )
}

export default CompanyCalender