import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { UserType } from '../types/UserType';

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.users;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Error fetching users: ${error.response.status} - ${error.response.data?.message}`
      );
      throw new Error(error.response.data?.message || 'Failed to fetch users');
    }
    console.error('Network or unexpected error:', error);
    throw new Error('Network error. Please try again.');
  }
};

export const toggleSubscribe = async (otherUserId: string, userId: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!userId) throw new Error('User ID is not defined');
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
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Server error');
    }
    throw new Error('Network error. Please try again.');
  }
};

export const getUserById = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.get(`${baseUrl}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('Fetched user:', response.data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('API error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      throw new Error(
        error.response?.data?.message ||
          `Request failed with status ${error.response?.status}`
      );
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const updateUser = async (user: UserType, formData: FormData) => {
  try {
    const response = await axios.put(
      `${baseUrl}/users/edit/${user._id}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return response.data.user;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Error updating user: ${error.response.status} - ${error.response.data?.message}`
      );
      throw new Error(error.response.data?.message || 'Failed to update user');
    }
    console.error('Network or unexpected error:', error);
    throw new Error('Network error. Please try again.');
  }
};
