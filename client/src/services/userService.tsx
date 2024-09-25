import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { Dispatch, SetStateAction } from 'react';
import { UserType } from '../types/UserType';
import { getUserProfile } from './authService';
import { getPosts } from './postServices';
import { PostType } from '../types/PostType';

export const getAllUsers = async (
  setUsers: Dispatch<SetStateAction<UserType[] | null>>
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const result = response.data;
      console.log('all users from get users', result.data);
      setUsers(result.data);
    }
  } catch (error) {
    console.error('Error fetching users', error);
  }
};

export const toggleSubscribe = async (
  otherUserId: string,
  userId: string,
  setUsers: Dispatch<SetStateAction<UserType[] | null>>
) => {
  try {
    const token = localStorage.getItem('token');
    if (!userId) {
      console.error('User ID is not defined');
      return;
    }
    const response = await axios.post(
      `${baseUrl}/users/${otherUserId}/subscribe`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      await getAllUsers(setUsers);
    }
  } catch (error) {
    console.error('Error by subscribing:', error);
  }
};

export const getUserById = async (
  id: string,
  setProfileUser: Dispatch<SetStateAction<UserType | null>>
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('data user getUser by id', response.data);
    setProfileUser(response.data);
    return response.data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const fetchUser = async (
  id: string,
  setProfileUser: Dispatch<SetStateAction<UserType | null>>
) => {
  if (id) {
    const user = await getUserById(id, setProfileUser);
    return user;
  }
};

export const fetchData = async (
  setUser: Dispatch<SetStateAction<UserType | null>>,
  setPosts: Dispatch<SetStateAction<PostType[] | null>>
) => {
  try {
    const user = await getUserProfile(setUser);
    const userCurrent = await getUserById(user._id, setUser);
    setUser(userCurrent);
    getPosts(setPosts);
  } catch (error) {
    console.error('Error loading user data:', error);
  }
};
