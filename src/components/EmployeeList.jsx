import { Divider, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import authStore from '../stores/authStore'
import { users } from '../mock_data/users';

const EmployeeList = () => {

    const { user, role } = authStore();
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        if (role === "admin") {
            setEmployeeData(users.filter(u => u.id !== user.id));
        } else if (role === "teamlead") {
            setEmployeeData(
                users.filter(u => (u.id !== user.id && u.teamLeadId === user.id))
            )
        }
    }, [role])

    const columns = [
        { title: 'Id', dataIndex: "id" },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Department', dataIndex: 'department' },
    ];

    return (
        <>
            <Divider>Employee List</Divider>

            <Table bordered columns={columns} dataSource={employeeData} rowKey="id" />
        </>
    )
}

export default EmployeeList