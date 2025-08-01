import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUserRole } from '../utils/auth';
import { UserRole } from '../types';

interface Props {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

const RoleBasedRoute: React.FC<Props> = ({ allowedRoles, children }) => {
  const role = getCurrentUserRole();
  if (!role) return <Navigate to="/not-found" />;
  const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());
  return normalizedAllowed.includes(role.toLowerCase()) ? <>{children}</> : <Navigate to="/not-found" />;
};

export default RoleBasedRoute;
