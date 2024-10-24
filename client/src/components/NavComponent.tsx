import {
  Heart,
  House,
  MagnifyingGlass,
  PaperPlaneTilt,
  PlusSquare,
} from '@phosphor-icons/react';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
import { UserContext } from '../context/UserContext';
import AddPost from '../components/AddPost';
import Modal from '../components/Modal';
import { getUserPostsByUserId } from '../services/postServices';
import SearchPage from './SearchPage';

const NavComponent = () => {
  const { user, setProfileUser, profileUser } = useContext(UserContext);
  const { setPosts } = useContext(PostContext);

  const navigate = useNavigate();
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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

  return (
    <nav className='flex flex-col items-start p-4 space-y-6'>
      <NavLink to={'home'}>
        <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
          <House size={32} />
          <p>Home</p>
        </div>
      </NavLink>

      <div
        className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'
        onClick={toggleSearchModal}>
        <MagnifyingGlass size={32} />
        <p>Search</p>
      </div>

      <Modal isOpen={isSearchModalOpen} onClose={toggleSearchModal}>
        <SearchPage />
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
        <img
          src={user?.user_img}
          alt='User Avatar'
          className='w-10 h-10 rounded-full'
        />
        <p>{user?.username}</p>
      </div>
    </nav>
  );
};

export default NavComponent;
