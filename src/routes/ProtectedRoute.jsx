import { Navigate, Outlet } from "react-router-dom";
import authStore from "../stores/authStore";

const ProtectedRoute = ({ allowedRoles }) => {

  const { isAuthenticated, role } = authStore()

  if (!isAuthenticated || !role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
