import Attendance from "../components/Attendance";
import CompanyCalender from "../components/CompanyCalender";
import Leave from "../components/Leave";
import Query from "../components/Query";
import Salary from "../components/Salary";
import Dashboard from "../pages/employee/Dashboard";
import NotFound from "../pages/not-found/NotFound";

const EmployeeRoutes = () => [
  { path: "dashboard", element: <Dashboard /> },
  { path: "attendance", element: <Attendance /> },
  { path: "calendar", element: <CompanyCalender /> },
  { path: "leave", element: <Leave /> },
  { path: "salary", element: <Salary /> },
  { path: "query", element: <Query /> },
  { path: "*", element: <NotFound /> }
];

export default EmployeeRoutes;
