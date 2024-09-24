import React, { useContext, useEffect } from 'react';

import userAvatar from '../assets/images/profile.png';

import { UserType } from '../types/UserType';
import { Link } from 'react-router-dom'; // Импортируем Link из react-router-dom
import { UserContext } from '../context/UserContext';
import { getAllUsers, toggleSubscribe } from '../services/userService';

const SearchPage = () => {
  const { users, user, setUsers } = useContext(UserContext);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleSubscribe = async (otherUserId: string) => {
    if (user) {
      await toggleSubscribe(otherUserId, user._id, setUsers);
    }
  };

  const isSubscribed = (otherUser: UserType) => {
    return (
      user &&
      user.following.some((followedUser) => followedUser._id === otherUser?._id)
    );
  };

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Search Users</h1>
      <form onSubmit={handleSearch} className='mb-4 flex space-x-2'>
        <input
          type='text'
          placeholder='Search users...'
          className='p-2 border border-gray-300 rounded-md flex-grow'
        />
        <button type='submit' className='p-2 bg-blue-500 text-white rounded-md'>
          Search
        </button>
      </form>
      <div className='space-y-4'>
        {users?.map((followingUser) => (
          <div
            key={followingUser._id}
            className='flex items-center space-x-4 p-4 border border-gray-200 rounded-md'>
            <img
              src={userAvatar}
              alt={followingUser.username}
              className='w-12 h-12 rounded-full'
            />
            <span className='font-medium'>{followingUser.username}</span>
            <div className='ml-auto'>
              <button
                onClick={() => handleSubscribe(followingUser._id)}
                className={`px-4 py-2 rounded-md ${
                  isSubscribed(followingUser)
                    ? 'bg-gray-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}>
                {isSubscribed(followingUser) ? 'Unsubscribe' : 'Subscribe'}
              </button>

              <Link to={`/user/${followingUser._id}`}>
                <button className='px-4 py-2 ml-4 bg-blue-500 text-white rounded-md'>
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
