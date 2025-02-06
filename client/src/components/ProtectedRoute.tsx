import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  const token = localStorage.getItem('token');

  if (!user && !token) {
    return <Navigate to='/login' />;
  }

  return children;
};
export default ProtectedRoute;
