import Attendance from "../components/Attendance";
import CompanyCalender from "../components/CompanyCalender";
import EmployeeList from "../components/EmployeeList";
import Leave from "../components/Leave";
import Query from "../components/Query";
import Salary from "../components/Salary";
import NotFound from "../pages/not-found/NotFound";
import Dashboard from "../pages/team-lead/Dashboard";

const TeamLeadRoutes = () => [
  { path: "dashboard", element: <Dashboard /> },
  { path: "attendance", element: <Attendance /> },
  { path: "calendar", element: <CompanyCalender /> },
  { path: "salary", element: <Salary /> },
  { path: "leave", element: <Leave /> },
  { path: "employees", element: <EmployeeList /> },
  { path: "query", element: <Query /> },
  { path: "*", element: <NotFound /> }
];

export default TeamLeadRoutes;
