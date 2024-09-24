import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { getUserProfile } from './authService';
import { Dispatch, SetStateAction } from 'react';
import { PostType } from '../types/PostType';
import { UserType } from '../types/UserType';
import { getCommentsByIds } from './commentService';
import { CommentType } from '../types/CommentType';

export const addPost = async (
  formData: FormData,
  setPost: Dispatch<SetStateAction<PostType | null>>,
  setPosts: Dispatch<SetStateAction<PostType[] | null>>,
  setComments: Dispatch<SetStateAction<CommentType[]>>
) => {
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
      console.log('New post', result);
      setPost(result);
      getPosts(setPosts);

      getCommentsByIds(result.comments, result, setPost, setComments);
    }
  } catch (error) {
    console.error('Error by adding post', error);
  }
};

export const getPosts = async (
  setPosts: Dispatch<SetStateAction<PostType[] | null>>
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/posts`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const result = response.data;
      setPosts(result);
      console.log('result posts', result);
      // setPostsAmount(result.length);
    }
  } catch (error) {
    console.error('Error fetching posts', error);
  }
};
export const getPostById = async (
  postId: string,
  setPost: Dispatch<SetStateAction<PostType | null>>
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const result = response.data;
      setPost(result);
      console.log('new pos from fost id ', result);
      // setPostsAmount(result.length);
    }
  } catch (error) {
    console.error('Error fetching posts', error);
  }
};

export const getUserPostsByUserId = async (
  userId: string,
  setPosts: Dispatch<SetStateAction<PostType[] | null>>
) => {
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
      //   post && (await getPostById(post?._id, setPost));
      setPosts(result);
      console.log('resul users posts', result);

      //setPostsAmount(result.length);
    }
  } catch (error) {
    console.error('Error fetching user posts', error);
  }
};

export const toggleLikePost = async (
  postId: string,
  setPost: Dispatch<SetStateAction<PostType | null>>,
  posts: PostType[],
  setPosts: Dispatch<SetStateAction<PostType[] | null>>
) => {
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
      const updatedPost = response.data;
      setPost(updatedPost);
      if (posts) {
        const updatedPosts = posts.map((p) =>
          p._id === updatedPost._id ? updatedPost : p
        );
        setPosts(updatedPosts);
      }
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
      getUserProfile(setUser);
      //setUser(updatedUser);
      console.log(' user from post context', user);
      console.log('updated user from post context', updatedUser);
    }
  } catch (error) {
    console.error('Error toggling save on post:', error);
  }
};
