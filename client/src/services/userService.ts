import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { UserType } from '../types/UserType';
import { handleAxiosError } from '../utils/apiUtils';

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return {
        success: false,
        error: 'No authentication token found',
        data: null,
      };
    }
    const response = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data, error: null };
  } catch (error: unknown) {
    return handleAxiosError(error, 'Error getting users');
  }
};

export const toggleSubscribe = async (otherUserId: string, userId: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!userId) {
      return { success: false, error: 'User ID is not defined', data: null };
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

    return { success: true, data: response.data, error: null };
  } catch (error: unknown) {
    return handleAxiosError(error, 'Error by subscribing');
  }
};

export const getUserById = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return {
        success: false,
        error: 'No authentication token found',
        data: null,
      };
    }

    const response = await axios.get(`${baseUrl}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { success: true, data: response.data, error: null };
  } catch (error: unknown) {
    return handleAxiosError(error, 'Error getting user');
  }
};

export const updateUser = async (user: UserType, formData: FormData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return {
        success: false,
        error: 'No authentication token found',
        data: null,
      };
    }
    const response = await axios.put(
      `${baseUrl}/users/edit/${user._id}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return { success: true, data: response.data, error: null };
  } catch (error: unknown) {
    return handleAxiosError(error, 'Error updating user');
  }
};
export const deleteUserById = async (userId: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return {
        success: false,
        error: 'No authentication token found',
        data: null,
      };
    }
    const response = await axios.delete(`${baseUrl}/users/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data, error: null };
  } catch (error: unknown) {
    return handleAxiosError(error, 'Error delete user');
  }
};
