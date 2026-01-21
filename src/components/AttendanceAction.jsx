import { CheckCircleOutlined, LogoutOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, message } from 'antd'
import React, { useState } from 'react'

const AttendanceAction = () => {

    const [isClockedIn, setIsClockedIn] = useState(false);
    const [isClockedOut, setIsClockedOut] = useState(false);

    const clockIn = () => {
        const time = new Date().toLocaleTimeString();
        setIsClockedIn(true);
        message.success(`Checked in at ${time}`);
    };

    const clockOut = () => {
        const time = new Date().toLocaleTimeString();
        setIsClockedOut(true);
        message.success(`Checked out at ${time}`);
    };

    return (
        <Card hoverable className='mb-4'>
            <Row justify="space-between" align={'middle'}>
                <Col xs={12} md={12}>
                    <h3>Today's Action</h3>
                    <p type="secondary">{new Date().toDateString()}</p>
                </Col>
                <Col xs={24} md={12} className='d-flex w-100 justify-content-end gap-2'>
                    <Button
                        type="primary"
                        size="large"
                        icon={<CheckCircleOutlined size={16} />}
                        onClick={clockIn}
                        disabled={isClockedIn}
                    >
                        Clock In
                    </Button>
                    <Button
                        type="primary"
                        danger
                        size="large"
                        iconPlacement='end'
                        icon={<LogoutOutlined size={16} />}
                        onClick={clockOut}
                        disabled={!isClockedIn || isClockedOut}
                    >
                        Clock Out
                    </Button>
                </Col>
            </Row>
        </Card>
    )
}

export default AttendanceAction