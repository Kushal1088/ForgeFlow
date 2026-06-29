import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminRouteGuard = ({ children }) => {
  const { isSuperAdmin } = useAuth();
  if (!isSuperAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children ? children : <Outlet />;
};

export const OrgRouteGuard = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/app/login" replace />;
  }
  return children ? children : <Outlet />;
};
