import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { handleAxiosError } from '../utils/apiUtils';

export const addPost = async (formData: FormData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseUrl}/posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data, error: null };
  } catch (error: unknown) {
    return handleAxiosError(error, 'Error adding post');
  }
};

export const getPosts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data, error: null };
  } catch (error: unknown) {
    return handleAxiosError(error, 'Error fetching posts');
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

    return { success: true, data: response.data, error: null };
  } catch (error: unknown) {
    return handleAxiosError(error, 'Error fetching post');
  }
};

export const getUserPostsByUserId = async (userId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/posts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data, error: null };
  } catch (error: unknown) {
    return handleAxiosError(error, 'Error fetching user posts');
  }
};

export const deletePostById = async (postId: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return {
        success: false,
        error: 'No authentication token found',
        data: null,
      };
    }
    const response = await axios.delete(`${baseUrl}/posts/delete/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data, error: null };
  } catch (error: unknown) {
    return handleAxiosError(error, 'Error delete post');
  }
};
