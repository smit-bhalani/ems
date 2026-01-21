import React from 'react'
import { Layout as AntLayout } from 'antd'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const MainLayout = () => {
    return (
        <AntLayout>
            <Header />
            <AntLayout style={{ height: "calc(100vh - 5rem)" }}>
                <Sidebar />
                <AntLayout.Content className='w-full bg-white'>
                    <div
                        style={{ height: "calc(100vh - 6rem)" }}
                        className='p-4 bg-white m-2 rounded shadow overflow-auto'
                        >
                        <Outlet />
                    </div>
                </AntLayout.Content>
            </AntLayout>
        </AntLayout>
    )
}

export default MainLayout