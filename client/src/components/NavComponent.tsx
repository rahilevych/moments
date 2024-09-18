import {
  Heart,
  House,
  MagnifyingGlass,
  PaperPlaneTilt,
  PlusSquare,
} from '@phosphor-icons/react';
import { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import img from '../assets/images/profile.png';

import { PostContext } from '../context/PostContext';
import { UserContext } from '../context/UserContext';

const NavComponent = () => {
  const { user, getUserProfile } = useContext(AuthContext);
  const { getUserPostsByUserId } = useContext(PostContext);
  const { setProfileUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    if (user && user._id) {
      setProfileUser(user);
      getUserPostsByUserId(user._id);
      navigate(`/user/${user._id}`);
    }
  };
  useEffect(() => {
    getUserProfile();
    // getUserPostsByUserId(user?._id)
  }, []);
  return (
    <nav className='flex flex-col items-start p-4 space-y-6'>
      <NavLink to={'home'}>
        <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
          <House size={32} />
          <p>Home</p>
        </div>
      </NavLink>
      <NavLink to={'search'}>
        <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
          <MagnifyingGlass size={32} />
          <p>Search</p>
        </div>
      </NavLink>

      <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
        <PaperPlaneTilt size={32} />
        <p>Messages</p>
      </div>

      <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
        <Heart size={32} />
        <p>Notifications</p>
      </div>

      <NavLink to={'add-post'}>
        <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
          <PlusSquare size={32} />
          <p>Create</p>
        </div>
      </NavLink>

      <div
        className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'
        onClick={handleNavigateToProfile}>
        <img src={img} alt='User Avatar' className='w-10 h-10 rounded-full' />
        <p>{user?.username}</p>
      </div>
    </nav>
  );
};

export default NavComponent;
