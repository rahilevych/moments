import {
  House,
  MagnifyingGlass,
  PlusSquare,
  User,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AddPost from '../components/AddPost';
import Modal from '../components/Modal';
import SearchPage from './SearchPage';
import { useAuth } from '../hooks/useAuth';

const NavComponent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleNavigateToProfile = () => {
    if (user && user._id) {
      navigate(`/user/${user._id}`);
    }
  };

  const toggleAddPostModal = () => {
    setIsAddPostModalOpen(!isAddPostModalOpen);
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  return (
    <>
      <nav className='hidden lg:flex flex-col items-start p-4 '>
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

        <div
          className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'
          onClick={toggleAddPostModal}>
          <PlusSquare size={32} />
          <p>Create</p>
        </div>

        <Modal isOpen={isAddPostModalOpen} onClose={toggleAddPostModal}>
          <AddPost onClose={toggleAddPostModal} />
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
      </nav>

      <div className='lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-2 flex justify-around items-center shadow-md'>
        <NavLink
          to={'home'}
          className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg'>
          <House size={32} />
        </NavLink>

        <div
          className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'
          onClick={toggleSearchModal}>
          <MagnifyingGlass size={32} />
        </div>

        <Modal isOpen={isSearchModalOpen} onClose={toggleSearchModal}>
          <SearchPage onClose={toggleSearchModal} />
        </Modal>

        <div
          className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'
          onClick={toggleAddPostModal}>
          <PlusSquare size={32} />
        </div>

        <Modal isOpen={isAddPostModalOpen} onClose={toggleAddPostModal}>
          <AddPost onClose={toggleAddPostModal} />
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
        </div>
      </div>
    </>
  );
};

export default NavComponent;
