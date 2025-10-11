import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "admin") return <Navigate to="admin/dashboard" replace />;
    else if (role === "doctor")
      return <Navigate to="doctor/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
