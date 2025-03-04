import { Toaster } from 'react-hot-toast';
import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserPage from './pages/UserPage';
import { useEffect } from 'react';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

import { getUserProfile } from './services/authService';
import { getUserById } from './services/userService';
import { useAuth } from './hooks/useAuth';

function App() {
  const { setUser } = useAuth();

  const setUserProfile = async () => {
    try {
      const userResponse = await getUserProfile();
      if (!userResponse.success) {
        console.error('Failed to get user profile:', userResponse.error);
        return;
      }
      const user = userResponse.data;
      const response = await getUserById(user._id);
      if (!response.success) {
        console.error('Failed to get user by ID:', response.error);
        return;
      }
      setUser(response.data);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserProfile();
    }
  }, []);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='login' element={<SignIn />} />
        <Route
          path='/user/*'
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
          <Route path='home' element={<Home />} />
          <Route path=':id' element={<UserPage />} />
          <Route path='profile/:id' element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
