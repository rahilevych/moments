import { useContext } from 'react';
import { UserType } from '../types/UserType';
import { UserContext } from '../context/UserContext';
import { getUserById, toggleSubscribe } from '../services/userService';
import { NavLink } from 'react-router-dom';
import { User } from '@phosphor-icons/react';

type Props = {
  filteredUsers: UserType[] | null;
  onClose: () => void;
};

const UsersList = (props: Props) => {
  const { user, setUser } = useContext(UserContext);

  const isSubscribed = (otherUser: UserType) => {
    return (
      user &&
      user.following.some((followedUser) => followedUser._id === otherUser?._id)
    );
  };

  const handleSubscribe = async (otherUserId: string) => {
    if (user) {
      await toggleSubscribe(otherUserId, user._id);
      setUser(await getUserById(user._id));
    }
  };

  const handleViewProfileClick = () => {
    props.onClose();
  };

  return (
    <div className='space-y-4 overflow-y-auto h-fit'>
      {props.filteredUsers?.map((followingUser) => (
        <div
          key={followingUser._id}
          className='flex justify-between items-center space-x-4 p-4 border border-gray-200 rounded-md'>
          <div className='flex items-center gap-2'>
            {followingUser.user_img ? (
              <img
                src={followingUser.user_img}
                alt='Profile'
                className='w-8 h-8 rounded-full border-2object-cover'
              />
            ) : (
              <User
                size={34}
                className='w-full h-full rounded-full border-2 border-gray-300 '
              />
            )}
            <span className='font-medium'>{followingUser.username}</span>
          </div>

          <div className='ml-auto '>
            <button
              onClick={() => handleSubscribe(followingUser._id)}
              className={`px-4 py-2 rounded-md ${
                isSubscribed(followingUser)
                  ? 'bg-gray-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}>
              {isSubscribed(followingUser) ? 'Unsubscribe' : 'Subscribe'}
            </button>

            <NavLink to={`/user/${followingUser._id}`}>
              <button
                onClick={handleViewProfileClick}
                className='px-4 py-2 ml-4 bg-blue-500 text-white rounded-md'>
                View Profile
              </button>
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
