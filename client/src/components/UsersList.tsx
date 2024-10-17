import React, { useContext } from 'react';
import { UserType } from '../types/UserType';
import { UserContext } from '../context/UserContext';
import { PostContext } from '../context/PostContext';
import userAvatar from '../assets/images/profile.png';
import {
  fetchData,
  getAllUsers,
  toggleSubscribe,
} from '../services/userService';
import { NavLink } from 'react-router-dom';
type Props = {
  filteredUsers: UserType[] | null;
};
const UsersList = (props: Props) => {
  const { user, setUsers, setUser } = useContext(UserContext);
  const { setPosts } = useContext(PostContext);

  const isSubscribed = (otherUser: UserType) => {
    return (
      user &&
      user.following.some((followedUser) => followedUser._id === otherUser?._id)
    );
  };
  const handleSubscribe = async (otherUserId: string) => {
    if (user) {
      await toggleSubscribe(otherUserId, user._id, setUsers);
      await fetchData(setUser, setPosts);
      await getAllUsers(setUsers);
    }
  };
  return (
    <div className='space-y-4 '>
      {props.filteredUsers?.map((followingUser) => (
        <div
          key={followingUser._id}
          className='flex justify-between items-center space-x-4 p-4 border border-gray-200 rounded-md'>
          <div className='flex items-center gap-2'>
            {' '}
            <img
              src={userAvatar}
              alt={followingUser.username}
              className='w-14 h-14 rounded-full'
            />
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
              <button className='px-4 py-2 ml-4 bg-blue-500 text-white rounded-md'>
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
