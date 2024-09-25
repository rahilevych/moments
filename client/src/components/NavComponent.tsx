import {
  Heart,
  House,
  MagnifyingGlass,
  PaperPlaneTilt,
  PlusSquare,
} from '@phosphor-icons/react';
import { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import img from '../assets/images/profile.png';
import { getUserProfile } from '../services/authService';
import { PostContext } from '../context/PostContext';
import { UserContext } from '../context/UserContext';
import { getUserPostsByUserId } from '../services/postServices';

const NavComponent = () => {
  const { user, setUser, setProfileUser, profileUser } =
    useContext(UserContext);
  const { post, setPosts } = useContext(PostContext);

  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    if (user && user._id) {
      setProfileUser(profileUser);
      post && getUserPostsByUserId(user._id, setPosts);
      navigate(`/user/${user._id}`);
    }
  };

  useEffect(() => {
    getUserProfile(setUser);
  }, []);
  return (
    <nav className='flex flex-col items-start p-4 space-y-6'>
      <NavLink to={'home'}>
        {' '}
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
