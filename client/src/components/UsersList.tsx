import { UserType } from '../types/UserType';
import { NavLink } from 'react-router-dom';
import { User } from '@phosphor-icons/react';
import SubscribeBtn from './SubscribeBtn';
import { useAuth } from '../hooks/useAuth';

type Props = {
  filteredUsers: UserType[] | null;
  onClose: () => void;
};

const UsersList = (props: Props) => {
  const { user } = useAuth();
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

            {user?._id != followingUser._id && (
              <td className=' flex '>
                <SubscribeBtn otherUser={followingUser} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersList;
