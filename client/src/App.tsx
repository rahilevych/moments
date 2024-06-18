import { Toaster } from 'react-hot-toast';
import './App.css';
import HistoryComponent from './components/HistoryComponent/HistoryComponent';
import NavComponent from './components/NavComponent/NavComponent';
import PostComponent from './components/PostComponent/PostComponent';
import AutorizationPage from './pages/SignIn/SignIn';
import Home from './pages/HomePage/Home';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { User } from '@phosphor-icons/react';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import UserPage from './pages/UserPage/UserPage';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='user' element={<UserPage />} />
        </Route>
        <Route path='login' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
