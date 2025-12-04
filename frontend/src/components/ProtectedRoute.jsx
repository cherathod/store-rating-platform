import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ roles = [] }) => {
  const { user, loading } = useContext(AuthContext);

  // Still loading user state
  if (loading) return <div>Loading...</div>;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role-based access
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User allowed
  return <Outlet />;
};

export default ProtectedRoute;
