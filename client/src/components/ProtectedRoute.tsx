import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  if (!user && !token) {
    return <Navigate to='/login' />;
  }

  return children;
};
export default ProtectedRoute;
