import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import RoleBasedRoute from './components/RoleBasedRoute';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import NotFound from './pages/NotFound';
import { getCurrentUserRole } from './utils/auth';
function RequireAuth({ children }: { children: React.ReactElement }) {
  const role = getCurrentUserRole();
  const location = useLocation();
  if (!role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AdminPage />
              </RoleBasedRoute>
            </RequireAuth>
          }
        />
        <Route
          path="/user"
          element={
            <RequireAuth>
              <RoleBasedRoute allowedRoles={["user", "admin"]}>
                <UserPage />
              </RoleBasedRoute>
            </RequireAuth>
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
