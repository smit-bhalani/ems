import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from '../pages/login'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '../layouts/MainLayout'
import AdminRoutes from './AdminRoutes'
import TeamLeadRoutes from './TeamLeadRoutes'
import EmployeeRoutes from './EmployeeRoutes'
import NotFound from '../pages/not-found/NotFound'

const Routes = () => {

    const routes = useRoutes([
        {
            path: "/",
            element: <Login />
        },
        {
            element: <ProtectedRoute allowedRoles={["admin"]} />,
            children: [
                {
                    path: "/admin",
                    element: <MainLayout />,
                    children: AdminRoutes()
                }
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["teamlead"]} />,
            children: [
                {
                    path: "/teamlead",
                    element: <MainLayout />,
                    children: TeamLeadRoutes()
                }
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["employee"]} />,
            children: [
                {
                    path: "/employee",
                    element: <MainLayout />,
                    children: EmployeeRoutes()
                },
            ]
        },
        {
            path: "*",
            element: <NotFound />
        }
    ])

    return routes;
}

export default Routes