import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { Dispatch, SetStateAction } from 'react';
import { UserType } from '../types/UserType';

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
      const updatedUser = response.data;
      console.log(
        'updated user from user context after subscribing',
        updatedUser
      );

      await getAllUsers(setUsers);
    }
  } catch (error) {
    console.error('Error by subscribing:', error);
  }
};

export const getUserById = async (
  id: string,
  setUser: Dispatch<SetStateAction<UserType | null>>
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('data user getUser by id', response.data);
    setUser(response.data);
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
  setProfileUser: Dispatch<SetStateAction<UserType | null>>,
  getUserProfile: (
    setUser: Dispatch<SetStateAction<UserType | null>>
  ) => Promise<void>,
  profileData: UserType
) => {
  try {
    await getUserProfile(setUser);
    setUser(profileData);

    if (profileData) {
      const userData = await getUserById(profileData._id, setProfileUser);
      console.log(userData);
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
};
