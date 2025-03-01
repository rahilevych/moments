import { useState } from 'react';
import { logout } from '../services/authService';
import { NavLink, useNavigate } from 'react-router-dom';
import { toggleSubscribe } from '../services/userService';
import { UserType } from '../types/UserType';
import Modal from './Modal';
import ConnectionsList from './ConnectionsList';
import { User } from '@phosphor-icons/react';
import { useAuth } from '../hooks/useAuth';

interface Props {
  profileUser: UserType;
}

const ProfileHeader: React.FC<Props> = ({ profileUser }) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<'followers' | 'following' | null>(
    null
  );
  const { user, setUser } = useAuth();

  if (!profileUser) {
    return null;
  }

  const handleOpenModal = (type: 'followers' | 'following') => {
    setModalType(type);
  };
  const handleCloseModal = () => {
    setModalType(null);
  };

  const isSubscribed = (otherUser: UserType) => {
    return (
      user &&
      user.following.some((followedUser) => followedUser._id === otherUser?._id)
    );
  };

  const handleSubscribe = async (otherUserId: string) => {
    if (!user) return;

    const response = await toggleSubscribe(otherUserId, user._id);
    if (!response.success) {
      console.error('Subscription failed:', response.error);
      return;
    }
  };

  const isCurrentUser = user?._id === profileUser._id;
  console.log('profile user from header', profileUser);

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

      <div className='profile-info flex flex-col items-center md:items-start mt-4 md:mt-0 md:ml-6'>
        <h2 className='text-2xl font-bold text-center md:text-left'>
          {profileUser.username}
        </h2>

        <div className='stats flex flex-wrap justify-center md:justify-start mt-2'>
          <div className='mr-4'>
            <span className='font-bold'>{profileUser.posts.length}</span> posts
          </div>

          <div
            className='mr-4 cursor-pointer'
            onClick={() => handleOpenModal('followers')}>
            <span className='font-bold'>{profileUser.followers.length}</span>{' '}
            followers
          </div>

          <div
            className='mr-4 cursor-pointer'
            onClick={() => handleOpenModal('following')}>
            <span className='font-bold'>{profileUser.following.length}</span>{' '}
            following
          </div>
        </div>

        {modalType && (
          <Modal isOpen={modalType !== null} onClose={handleCloseModal}>
            <ConnectionsList
              profileUser={profileUser}
              modalType={modalType}
              onClose={handleCloseModal}
            />
          </Modal>
        )}

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
