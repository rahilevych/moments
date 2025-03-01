import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
//import { UserType } from '../types/UserType';
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

    return response.status === 201
      ? { success: true, data: response.data, error: null }
      : { success: false, error: 'Unexpected response status', data: null };
  } catch (error: any) {
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

    return response.status === 200
      ? { success: true, data: response.data.posts, error: null }
      : { success: false, error: 'Unexpected response status', data: null };
  } catch (error: any) {
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

    return response.status === 200
      ? { success: true, data: response.data.post, error: null }
      : { success: false, error: 'Unexpected response status', data: null };
  } catch (error: any) {
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

    return response.status === 200
      ? { success: true, data: response.data.posts, error: null }
      : { success: false, error: 'Unexpected response status', data: null };
  } catch (error: any) {
    return handleAxiosError(error, 'Error fetching user posts');
  }
};

// export const toggleSavePost = async (
//   postId: string,
//   userId: string,
//   user: UserType
// ) => {
//   try {
//     const token = localStorage.getItem('token');

//     if (!userId) {
//       console.error('User ID is not defined');
//       return;
//     }
//     const response = await axios.post(
//       `${baseUrl}/posts/${postId}/save`,
//       {},
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (response.status === 200) {
//       const updatedUser = response.data;

//       console.log(' user from post context', user);
//       console.log('updated user from post context', updatedUser);
//     }
//   } catch (error) {
//     console.error('Error toggling save on post:', error);
//   }
// };
