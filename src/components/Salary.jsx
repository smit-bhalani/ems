import { Button, Card, Col, Collapse, Divider, Flex, Input, Row, Statistic, Table, Typography } from 'antd'
import React, { useRef, useState } from 'react'
import authStore from '../stores/authStore'
import { PROFESSIONAL_TAX, calculateDeduction, calculateIT, calculateNP, calculatePF } from '../utils/calculateSalary';
import { InteractionOutlined } from '@ant-design/icons';
import { users } from '../mock_data/users';
import { salaryData } from '../mock_data/salaryData';
import { useReactToPrint } from 'react-to-print';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Salary = () => {

    const { user, role } = authStore();
    const salary = user?.salary || 0;
    const isAdmin = role === 'admin';
    
    const [salaryHistory, setSalaryHistory] = useState(salaryData.filter(s => s.userId === user.id).reverse());
    const [filterSalaryData, setFilterSalaryData] = useState(salaryData.filter(s => s.userId !== user.id));

    const slipRef = useRef(null);
    const printSlip = useReactToPrint({
        contentRef: slipRef,
    })

    const getEmployeeName = (userId) =>
        users.find(u => u.id === userId)?.name || "";

    const columns = [
        { title: 'Employee', dataIndex: "userId", render: _ => getEmployeeName(_) },
        { title: 'Salary Paid', dataIndex: 'salaryPaid' },
        { title: 'Date Paid', dataIndex: 'datePaid' },
    ];

    const handleSearch = (value) => {
        const searchValue = value.trim().toLowerCase();
        const initData = salaryData.filter(s => s.userId !== user.id)

        if (!searchValue) {
            setFilterSalaryData(initData);
        } else {
            setFilterSalaryData(initData.filter(i =>
                getEmployeeName(i.userId).toLowerCase().includes(searchValue) ||
                i.salaryPaid == searchValue
            ))
        }
    }

    return (
        <>
            <Divider>Salary Slip</Divider>

            <div className="p-4">
                <Card className="border mb-4">
                    <Row gutter={24}>
                        <Col span={8} className="text-center">
                            <Statistic title="Gross Pay" value={(salary)} prefix="Rs." />
                        </Col>
                        <Col span={8} className="text-center">
                            <Statistic title="Deductions" value={calculateDeduction(salary)} prefix="Rs." styles={{ content: { color: "#f5222d" } }} />
                        </Col>
                        <Col span={8} className="text-center">
                            <Statistic title="Net Payable" value={calculateNP(salary)} prefix="Rs." styles={{ content: { color: "#52c41a" } }} />
                        </Col>
                    </Row>
                </Card>

                <Flex justify='end' className='mb-3'>
                    <Button type='primary' onClick={printSlip}>Print Payslip</Button>
                </Flex>

                <div className="bg-white p-5 border rounded shadow-sm mx-auto" style={{ maxWidth: 800 }} ref={slipRef}>
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} md={12} className='text-center'>
                            <p><InteractionOutlined className='fs-2' rotate={30} /></p>
                            <Typography.Text type="secondary">Employee Management System</Typography.Text>
                        </Col>
                        <Col xs={24} md={12} className='text-center'>
                            <Typography.Title level={5} className="m-0">PAYSLIP</Typography.Title>
                            <Typography.Text>Month: {months[new Date().getMonth()]} {new Date().getFullYear()}</Typography.Text>
                        </Col>
                    </Row>

                    <Divider />

                    <Row className="mb-4">
                        <Col xs={24} md={12}>
                            <p><b>Employee Name:</b> {user?.name}</p>
                            <p><b>Designation:</b> {user?.department}</p>
                            <p><b>Role:</b> <span className='text-capitalize'>{user?.role}</span></p>
                        </Col>
                        <Col xs={24} md={12} className="text-end">
                            <p><b>Employee ID:</b> EMP-1234-{user.id}</p>
                            <p><b>PAN Card:</b> ABCDE1234F</p>
                            <p><b>Bank A/C:</b> ****4567</p>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Typography.Title level={5}>Earnings</Typography.Title>
                            <Flex justify='space-between' className="mb-2"><span>Total Pay</span><span>Rs. {salary}</span></Flex>
                            <Divider className="my-2" />
                            <Flex justify='space-between'><b>Total Earnings</b><b>Rs. {salary}</b></Flex>
                        </Col>
                        <Col xs={24} md={12}>
                            <Typography.Title level={5}>Deductions</Typography.Title>
                            <Flex justify='space-between' className="mb-2"><span>Provident Fund</span><span>Rs. {calculatePF(salary)}</span></Flex>
                            <Flex justify='space-between' className="mb-2"><span>Income Tax</span><span>Rs. {calculateIT(salary)}</span></Flex>
                            <Flex justify='space-between' className="mb-2"><span>Professional Tax</span><span>Rs. {PROFESSIONAL_TAX}</span></Flex>
                            <Divider className="my-2" />
                            <Flex justify='space-between'><b>Total Deductions</b><b>Rs. {calculateDeduction(salary)}</b></Flex>
                        </Col>
                    </Row>

                    <div className="mt-5 p-3 bg-light rounded text-center">
                        <Typography.Text strong size="large">NET SALARY PAYABLE: Rs. {calculateNP(salary)}</Typography.Text>
                    </div>
                </div>
            </div>
            <Divider>Salary History</Divider>
            <Collapse
                items={[
                    {
                        key: '1',
                        label: 'View Salary History',
                        children: <Table bordered columns={columns} dataSource={salaryHistory} />
                    },
                    ...(isAdmin
                        ? [
                            {
                                key: '2',
                                label: 'All Employees Salary History',
                                children: <Table
                                    bordered
                                    columns={columns}
                                    dataSource={filterSalaryData}
                                    title={() => <Flex justify='end'>
                                        <Input.Search
                                            style={{ width: 350 }}
                                            placeholder='search employee'
                                            onSearch={handleSearch}
                                        />
                                    </Flex>}
                                />
                            }
                        ]
                        : [])
                ]}
            />
        </>
    )
}

export default Salary