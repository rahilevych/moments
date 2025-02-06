import {
  Heart,
  House,
  MagnifyingGlass,
  PaperPlaneTilt,
  PlusSquare,
  User,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import AddPost from '../components/AddPost';
import Modal from '../components/Modal';
import { getUserPostsByUserId } from '../services/postServices';
import SearchPage from './SearchPage';
import { useUser } from '../hooks/useUser';
import { usePost } from '../hooks/usePost';

const NavComponent = () => {
  const { user, setProfileUser, profileUser } = useUser();
  const { setPosts } = usePost();

  const navigate = useNavigate();
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigateToProfile = () => {
    if (user && user._id) {
      setProfileUser(profileUser);
      async () => {
        setPosts(await getUserPostsByUserId(user._id));
      };
      navigate(`/user/${user._id}`);
    }
  };

  const toggleAddPostModal = () => {
    setIsAddPostModalOpen(!isAddPostModalOpen);
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='flex flex-col lg:flex-row items-start p-4 space-y-6 lg:space-x-4 lg:space-y-0'>
      <div className='lg:hidden'>
        <button
          onClick={toggleMenu}
          className='p-2 flex flex-col justify-center items-center space-y-1'>
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 transform ${
              isMenuOpen ? 'rotate-45 translate-y-1' : ''
            }`}></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 transform ${
              isMenuOpen ? '-rotate-45 -translate-y-1' : ''
            }`}></span>
        </button>
      </div>

      <div
        className={`lg:flex flex-col items-start w-full space-y-6 lg:space-y-0 ${
          isMenuOpen ? 'block' : 'hidden'
        } transition-all duration-300`}>
        <NavLink
          to={'home'}
          className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg'>
          <House size={32} />
          <p>Home</p>
        </NavLink>

        <div
          className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'
          onClick={toggleSearchModal}>
          <MagnifyingGlass size={32} />
          <p>Search</p>
        </div>

        <Modal isOpen={isSearchModalOpen} onClose={toggleSearchModal}>
          <SearchPage onClose={toggleSearchModal} />
        </Modal>

        <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
          <PaperPlaneTilt size={32} />
          <p>Messages</p>
        </div>

        <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
          <Heart size={32} />
          <p>Notifications</p>
        </div>

        <div
          className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'
          onClick={toggleAddPostModal}>
          <PlusSquare size={32} />
          <p>Create</p>
        </div>

        <Modal isOpen={isAddPostModalOpen} onClose={toggleAddPostModal}>
          <AddPost />
        </Modal>

        <div
          className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'
          onClick={handleNavigateToProfile}>
          {user && user.user_img ? (
            <img
              src={user.user_img}
              alt='Profile'
              className='w-8 h-8 rounded-full object-cover'
            />
          ) : (
            <User
              size={34}
              className='w-8 h-8 rounded-full border-2 border-gray-300'
            />
          )}
          <p>{user?.username}</p>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
