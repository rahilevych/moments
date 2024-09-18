import { Toaster } from 'react-hot-toast';
import './App.css';

import Home from './pages/Home';

import { Route, Routes } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserPage from './pages/UserPage';
import AddPost from './components/AddPost';
import { useEffect } from 'react';

import DetailedPost from './pages/DetailedPost';

import Layout from './components/Layout';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {}, []);
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
          <Route path='add-post' element={<AddPost />} />
          <Route path=':id/post/:id' element={<DetailedPost />} />
          <Route path='search' element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
