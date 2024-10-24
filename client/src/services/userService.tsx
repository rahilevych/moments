import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { UserType } from '../types/UserType';

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const result = response.data;
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching users', error);
  }
};

export const toggleSubscribe = async (otherUserId: string, userId: string) => {
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
    return response;
  } catch (error) {
    console.error('Error by subscribing:', error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const updateUser = async (user: UserType, formData: FormData) => {
  try {
    const response = await axios.put(
      `${baseUrl}/users/edit/${user._id}`,
      formData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    throw error;
  }
};
