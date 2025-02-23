import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { baseUrl } from '../utils/baseUrl';
import { UserType } from '../types/UserType';
import { Dispatch, SetStateAction } from 'react';

export const signUp = async (
  email: string,
  username: string,
  password: string,
  fullname: string
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/users/registration`,
      {
        email,
        username,
        password,
        fullname,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return { success: true };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.message || 'Registration failed';
      return {
        success: false,
        field: message.includes('email') ? 'email' : 'username',
        message,
      };
    }
    return { success: false, message: 'Network error' };
  }
};

export const signIn = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, {
      username,
      password,
    });

    const { token } = response.data;
    localStorage.setItem('token', token);
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || 'Something went wrong');
    }
    throw new Error('Network error');
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
    return;
  }
  try {
    const response = await axios.get(`${baseUrl}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.user;
    }
  } catch (error) {
    console.error('Error fetching user profile', error);
    return error;
  }
};
export const logout = (
  setUser: Dispatch<SetStateAction<UserType | null>>,
  navigate: NavigateFunction
) => {
  setUser(null);
  localStorage.removeItem('token');
  navigate('/');
};
