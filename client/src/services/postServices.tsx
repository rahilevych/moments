import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { Dispatch, SetStateAction } from 'react';
import { UserType } from '../types/UserType';

export const addPost = async (formData: FormData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseUrl}/posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const result = response.data;
      return result;
    }
  } catch (error) {
    console.error('Error by adding post', error);
  }
};

export const getPosts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/posts`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const result = response.data.data;
      console.log('>>>>>>>>>>>>posts', response.data.data);
      return result;
    }
  } catch (error) {
    console.error('Error fetching posts', error);
    return error;
  }
};
export const getPostById = async (postId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const result = response.data;
      return result;
    }
  } catch (error) {
    console.error('Error fetching posts', error);
  }
};

export const getUserPostsByUserId = async (userId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/posts/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const result = response.data;
      return result;
    }
  } catch (error) {
    console.error('Error fetching user posts', error);
  }
};

export const toggleLikePost = async (postId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${baseUrl}/posts/${postId}/like`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error toggling like on post:', error);
  }
};

export const toggleSavePost = async (
  postId: string,
  userId: string,
  user: UserType,
  setUser: Dispatch<SetStateAction<UserType | null>>
) => {
  try {
    const token = localStorage.getItem('token');

    if (!userId) {
      console.error('User ID is not defined');
      return;
    }
    const response = await axios.post(
      `${baseUrl}/posts/${postId}/save`,
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
      //console.log('updated user after saving post', updatedUser);
      //getUserProfile(setUser);
      //setUser(updatedUser);
      console.log(' user from post context', user);
      console.log('updated user from post context', updatedUser);
    }
  } catch (error) {
    console.error('Error toggling save on post:', error);
  }
};
