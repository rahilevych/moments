import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { logout } from '../services/authService';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  getAllUsers,
  getUserById,
  toggleSubscribe,
} from '../services/userService';
import { UserType } from '../types/UserType';
import Modal from './Modal';
import Following from './Following';
import Followers from './Followers';
import { User } from '@phosphor-icons/react';

const ProfileHeader = () => {
  const { user, setUser, profileUser, setProfileUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [isFollowerOpen, setIsFollowerOpen] = useState(false);
  const toggleFollowingModal = () => {
    setIsFollowingOpen(!isFollowingOpen);
  };
  const toggleFollowerModal = () => {
    setIsFollowerOpen(!isFollowerOpen);
  };

  if (!profileUser) {
    return null;
  }

  const isSubscribed = (otherUser: UserType) => {
    return (
      user &&
      user.following.some((followedUser) => followedUser._id === otherUser?._id)
    );
  };
  const handleSubscribe = async (otherUserId: string) => {
    if (user) {
      await toggleSubscribe(otherUserId, user._id);
      await getAllUsers();
      setProfileUser(await getUserById(profileUser._id));
    }
  };

  const isCurrentUser = user?._id === profileUser._id;
  console.log('profile user from heaedr', profileUser);

  return (
    <div className='profile-header flex flex-col items-center md:flex-row md:justify-between p-4 border-b border-gray-200'>
      <div className='flex justify-center profile-avatar w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden'>
        {profileUser.user_img ? (
          <img
            src={profileUser.user_img}
            alt='Profile'
            className='w-full h-full object-cover'
          />
        ) : (
          <User
            size={34}
            className='w-full h-full rounded-full border-2 border-gray-300 '
          />
        )}
      </div>
      <div className='profile-info flex flex-col md:ml-6 mt-4 md:mt-0'>
        <h2 className='text-2xl font-bold'>{profileUser.username}</h2>
        <div className='stats flex mt-2'>
          <div className='mr-4'>
            <span className='font-bold'>{profileUser.posts.length}</span> posts
          </div>

          <div className='mr-4 cursor-pointer' onClick={toggleFollowerModal}>
            <span className='font-bold'>{profileUser.followers.length}</span>{' '}
            followers
          </div>

          <div className='mr-4' onClick={toggleFollowingModal}>
            <span className='font-bold'>{profileUser.following.length}</span>{' '}
            following
          </div>
          <Modal isOpen={isFollowingOpen} onClose={toggleFollowingModal}>
            <Following onClose={toggleFollowerModal} />
          </Modal>
          <Modal isOpen={isFollowerOpen} onClose={toggleFollowerModal}>
            <Followers onClose={toggleFollowerModal} />
          </Modal>
        </div>
        <div className='flex space-x-2 mt-4'>
          {isCurrentUser ? (
            <>
              <NavLink to={`/user/profile/${user._id}`}>
                <button className='px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700'>
                  Edit profile
                </button>
              </NavLink>

              <button
                onClick={() => logout(setUser, navigate)}
                className='px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700'>
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => handleSubscribe(profileUser._id)}
              className={`px-4 py-2 rounded-md ${
                isSubscribed(profileUser)
                  ? 'bg-gray-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}>
              {isSubscribed(profileUser) ? 'Unsubscribe' : 'Subscribe'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
