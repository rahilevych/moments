import { useContext } from 'react';
import profile from '../assets/images/profile.png';
import { UserContext } from '../context/UserContext';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const isCurrentUser = user?._id === user._id;
  console.log('profile user from heaedr', user);
  return (
    <div className='profile-header flex flex-col items-center md:flex-row md:justify-between p-4 border-b border-gray-200'>
      <div className='profile-avatar w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden'>
        <img
          src={profile}
          alt='Profile'
          className='w-full h-full object-cover'
        />
      </div>
      <div className='profile-info flex flex-col md:ml-6 mt-4 md:mt-0'>
        <h2 className='text-2xl font-bold'>{user.username}</h2>
        <div className='stats flex mt-2'>
          <div className='mr-4'>
            <span className='font-bold'>{user.posts.length}</span> posts
          </div>
          <div className='mr-4'>
            <span className='font-bold'>{user.followers.length}</span> followers
          </div>
          <div className='mr-4'>
            <span className='font-bold'>{user.following.length}</span> following
          </div>
        </div>
        <div className='flex space-x-2 mt-4'>
          {isCurrentUser ? (
            <>
              <button className='px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700'>
                Edit profile
              </button>
              <button
                onClick={() => logout(setUser, navigate)}
                className='px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700'>
                Log out
              </button>
            </>
          ) : (
            <>
              <button className='px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700'>
                Subscribe
              </button>
              <button className='px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700'>
                Unsubscribe
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
