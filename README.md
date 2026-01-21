# Employment Management System (EMS)

An Employment Management System built to manage employees with role-based access and core HR workflows such as attendance, leave management, and salary overview.

---

## Overview

The Employment Management System (EMS) is a frontend web application that demonstrates role-based dashboards.  
Different users (Admin, Team Lead, Employee) have access to different features based on their roles.

---

## Tech Stack

- React JS
- Ant Design (React UI Components)
- Bootstrap (Styling)
- Zustand (State Management)
- Vite (Development Tool)

---

## Features

### Role-Based Access
- Secure role-based access for **Admin**, **Team Lead**, and **Employee**
- Each role has different permissions and views

### Dashboards
- **Admin Dashboard**
  - Overview of employees, attendance, leaves, and salary
- **Team Lead Dashboard**
  - Team attendance, team leave requests, and team members
- **Employee Dashboard**
  - Personal attendance, leave balance, and salary summary

### Attendance Management
- Daily check-in and check-out functionality
- View attendance history

### Calendar & Holidays
- Company calendar view with holidays
- Admin can add or remove company holidays

### Leave Management
- Employees and Team Leads can apply for leave
- Team Leads can approve or reject leave requests of their team members
- Admin can approve or reject all leave requests
- Leave history tracking

### Salary Management
- View current month salary slip
- View salary history
- Print salary slip

### Employee Management
- Admin and Team Lead can access employee list
- View basic employee details

### Query Management
- Employees and Team Leads can raise queries
- Admin can view and take action on queries


---

## Local Setup

Follow the steps below to run the project locally:

```bash
# Clone the repository
git clone <repository-url>

# Go to project directory
cd employment-management-system

# Install dependencies
npm install

# Start the development server
npm run dev

--

## Demo Credentials

### Admin
- Email: admin@ems.com
- Password: 123456

### Team Lead
- Email: lead@ems.com
- Password: 123456

### Employee
- Email: employee@ems.com
- Password: 123456

```

---

## Evaluation Highlights

### Advanced Calendar
- Admin can add and remove company holidays
- Holidays persist using **state management and localStorage**
- After logout and login, holidays are visible to **Team Lead** and **Employee** views

### Filters & Search
- Leave management includes:
  - Search by employee name
  - Filter leaves by status: **Pending / Approved / Rejected**
  - Column-level search and filter functionality
- Global search functionality implemented in **Admin – View All Salary** table

### Application Structure
- Followed a clean and standard project folder structure
- Separation of concerns for components, pages, routes, and state management

### Role-Based Flow
- Implemented using **React Router DOM**
- Protected routes based on user role

### Responsive Design
- All major components are responsive
- Layout adapts for different screen sizes

### Reusable Components
- **Attendance Action Component** (Check-in / Check-out)
- **Profile Card Component**
- **Activity Component**
