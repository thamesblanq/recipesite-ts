import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFetchUserQuery } from "../features/auth/authApi"

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user, error } = useFetchUserQuery();
  const location = useLocation();

  if (error) {
    // Handle error, e.g., show a message
    return <div>Error loading user data</div>;
  }

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
