import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { baseUrl } from '../utils/baseUrl';
import { UserType } from '../types/UserType';
import { Dispatch, SetStateAction } from 'react';

export const signUp = async (
  email: string,
  username: string,
  password: string,
  fullname: string,
  navigate: NavigateFunction
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

    if (response.status === 201) {
      navigate('/login');
    } else {
      console.error('Unexpected response status:', response.status);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error with data:', error.response?.data);
      console.error('Axios error :', error.message);
    } else {
      console.error('Error by signing up:', error);
    }
  }
};

export const signIn = async (
  username: string,
  password: string,
  user: UserType | null,
  navigate: NavigateFunction
) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem('token', token);
      if (user) {
        navigate(`/user/home`);
      }
    }
  } catch (error) {
    console.error('Error during signing in', error);
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
