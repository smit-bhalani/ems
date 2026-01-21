import Attendance from "../components/Attendance";
import CompanyCalender from "../components/CompanyCalender";
import EmployeeList from "../components/EmployeeList";
import Leave from "../components/Leave";
import Query from "../components/Query";
import Salary from "../components/Salary";
import Dashboard from "../pages/admin/Dashboard";
import NotFound from "../pages/not-found/NotFound";

const AdminRoutes = () => [
  { path: "dashboard", element: <Dashboard /> },
  { path: "attendance", element: <Attendance /> },
  { path: "calendar", element: <CompanyCalender /> },
  { path: "leave", element: <Leave /> },
  { path: "salary", element: <Salary /> },
  { path: "employees", element: <EmployeeList /> },
  { path: "query", element: <Query /> },
  { path: "*", element: <NotFound /> }
];

export default AdminRoutes;
