import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { baseUrl } from '../utils/baseUrl';
import { UserType } from '../types/UserType';
import { Dispatch, SetStateAction } from 'react';
import { handleAxiosError } from '../utils/apiUtils';

export const signUp = async (
  email: string,
  username: string,
  password: string,
  fullname: string
) => {
  try {
    await axios.post(
      `${baseUrl}/users/registration`,
      { email, username, password, fullname },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return { success: true };
  } catch (error: any) {
    return handleAxiosError(error, 'Registration error');
  }
};

export const signIn = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, {
      username,
      password,
    });
    return { success: true, data: response.data.token };
  } catch (error: any) {
    return handleAxiosError(error, 'Error by sign in');
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Error: No token found in localStorage');
    return { success: false, error: 'No token found in localStorage' };
  }

  try {
    const response = await axios.get(`${baseUrl}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data.user };
  } catch (error: any) {
    return handleAxiosError(error, 'Error getting user profile');
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
