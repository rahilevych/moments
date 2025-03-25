import { UserType } from '../types/UserType';
import { getUserById, toggleSubscribe } from '../services/userService';
import { NavLink } from 'react-router-dom';
import { User } from '@phosphor-icons/react';
import { useAuth } from '../hooks/useAuth';

type Props = {
  filteredUsers: UserType[] | null;
  onClose: () => void;
};

const UsersList = (props: Props) => {
  const { user, setUser } = useAuth();

  const isSubscribed = (otherUser: UserType) => {
    return (
      user &&
      user.following.some((followedUser) => followedUser._id === otherUser?._id)
    );
  };

  const handleSubscribe = async (otherUserId: string) => {
    if (!user) return;
    try {
      await toggleSubscribe(otherUserId, user._id);
      const result = await getUserById(user._id);
      if (result.success) {
        setUser(result.data);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  const handleViewProfileClick = () => {
    props.onClose();
  };

  return (
    <table className='w-full border-collapse'>
      <tbody className='space-y-4'>
        {props.filteredUsers?.map((followingUser) => (
          <tr
            key={followingUser._id}
            className='flex flex-row justify-between items-center p-3 border border-gray-200 rounded-md'>
            <td>
              <NavLink
                to={`/user/${followingUser._id}`}
                onClick={handleViewProfileClick}>
                <div className='flex  items-center gap-2 cursor-pointer'>
                  {' '}
                  {followingUser.user_img ? (
                    <img
                      src={followingUser.user_img}
                      alt='Profile'
                      className='w-12 h-12 sm:w-8 sm:h-8 rounded-full border-2 object-cover'
                    />
                  ) : (
                    <User
                      size={34}
                      className='w-12 h-12 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300'
                    />
                  )}
                  <span className='font-medium text-sm sm:text-base'>
                    {followingUser.username}
                  </span>
                </div>
              </NavLink>
            </td>

            <td className=' flex '>
              <button
                onClick={() => handleSubscribe(followingUser._id)}
                className={`px-4 py-2 rounded-md text-sm sm:text-base h-10 w-full sm:w-auto flex items-center justify-center ${
                  isSubscribed(followingUser)
                    ? 'bg-gray-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}>
                {isSubscribed(followingUser) ? 'Unsubscribe' : 'Subscribe'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersList;
