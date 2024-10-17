import React, { useContext, useEffect, useState } from 'react';
import userAvatar from '../assets/images/profile.png';
import { UserType } from '../types/UserType';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import {
  fetchData,
  getAllUsers,
  toggleSubscribe,
} from '../services/userService';
import { PostContext } from '../context/PostContext';

const SearchPage = () => {
  const { users, user, setUsers, setUser } = useContext(UserContext);
  const { setPosts } = useContext(PostContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (query: string) => {
    if (!users) {
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const results = users.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerCaseQuery) ||
        user.fullname.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(results);
  };

  const handleSubscribe = async (otherUserId: string) => {
    if (user) {
      await toggleSubscribe(otherUserId, user._id, setUsers);
      await fetchData(setUser, setPosts);
      await getAllUsers(setUsers);
    }
  };

  const isSubscribed = (otherUser: UserType) => {
    return (
      user &&
      user.following.some((followedUser) => followedUser._id === otherUser?._id)
    );
  };

  const fetchUsers = async () => {
    try {
      await fetchData(setUser, setPosts);
      await getAllUsers(setUsers);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Search Users</h1>
      <form className='mb-4 flex space-x-2'>
        <input
          type='text'
          placeholder='Search users...'
          className='p-2 border border-gray-300 rounded-md flex-grow'
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </form>
      <div className='space-y-4 '>
        {filteredUsers?.map((followingUser) => (
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
    </div>
  );
};

export default SearchPage;
