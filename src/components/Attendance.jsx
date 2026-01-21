import { Divider,  Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import AttendanceAction from './AttendanceAction'
import { attendanceData } from '../mock_data/attendanceData'
import authStore from '../stores/authStore'
import { users } from '../mock_data/users'

const statusColorMap = {
    present: 'green',
    late: 'red',
    absent: 'volcano',
    leave: 'blue'
};

const Attendance = () => {

    const { user, role } = authStore();
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [memberHistory, setMemberHistory] = useState([]);
    const isAdmin = role === "admin";
    const isTeamLead = role === "teamlead";

    useEffect(() => {
        if (isAdmin) {
            setAttendanceHistory(attendanceData.filter(a => a.userId === user.id));
            setMemberHistory(attendanceData.filter(a => a.userId !== users.id));
        }
        else if (isTeamLead) {
            setAttendanceHistory(attendanceData.filter(a => a.userId === user.id));
            setMemberHistory(
                attendanceData.filter(a => {
                    const employee = users.find(u => u.id === a.userId);
                    return employee?.teamLeadId === user.id
                })
            )
        }
        else {
            setAttendanceHistory(
                attendanceData.filter(a => a.userId === user.id)
            );
        }
    }, [role, user]);

    const getEmployeeName = (userId) =>
        users.find(u => u.id === userId)?.name || "";

    const columns = [
        { title: 'Employee', dataIndex: "userId", render: _ => getEmployeeName(_) },
        { title: 'Date', dataIndex: 'date' },
        { title: 'In Time', dataIndex: 'checkIn', render: _ => _ || "-" },
        { title: 'Out Time', dataIndex: 'checkOut', render: _ => _ || "-" },
        {
            title: 'Status', dataIndex: 'status', render: (text) => (
                <Tag color={statusColorMap[text?.toLowerCase()] || "default"}>{text}</Tag>
            )
        }
    ];

    return (
        <>
            <Divider>Attendance</Divider>
            <AttendanceAction />
            <Divider />
            <Table bordered columns={columns} dataSource={attendanceHistory} />
            {
                memberHistory.length > 0 && <>
                    <Divider className='mb-5 fw-bold fs-5'>Team Members History</Divider>
                    <Table bordered dataSource={memberHistory} columns={columns} />
                </>
            }
        </>
    )
}

export default Attendance