import React, { ReactNode, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  if (!user && !token) {
    return <Navigate to='/login' />;
  }

  return children;
};
export default ProtectedRoute;
