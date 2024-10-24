import { Toaster } from 'react-hot-toast';
import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserPage from './pages/UserPage';
import { useContext, useEffect } from 'react';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import { UserContext } from './context/UserContext';
import { getUserProfile } from './services/authService';
import { getUserById } from './services/userService';

function App() {
  const { setUser } = useContext(UserContext);

  const setUserProfile = async () => {
    const user = await getUserProfile();
    setUser(await getUserById(user._id));
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
