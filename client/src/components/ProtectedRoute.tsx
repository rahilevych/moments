import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem('token');

  if (!user && !token) {
    return <Navigate to='/login' />;
  }

  return children;
};
export default ProtectedRoute;
