import { ReactNode, createContext, useContext, useState } from 'react';
import axios from 'axios';
import { PostType } from '../types/PostType';
import { AuthContext } from './AuthContext';
import { CommentContext } from './CommentContext';
import { baseUrl } from '../utils/baseUrl';

type PostContextType = {
  toggleLikePost: (postId: string) => Promise<void>;
  toggleSavePost: (postId: string, userId: string) => Promise<void>;
  post: PostType | null;
  posts: PostType[] | null;
  setPost: (post: PostType) => void;
  setPosts: (post: PostType[]) => void;
  setFile: (file: React.MutableRefObject<File | null>) => void;
  setCaption: (caption: string) => void;
  caption: string;
  postsAmount: number;
  setPostsAmount: (amount: number) => void;
  addPost: (formData: FormData) => Promise<void>;
  getPosts: () => Promise<void>;
  getUserPostsByUserId: (userId: string) => Promise<void>;
  getPostById: (userId: string) => Promise<void>;
};

const initPostContextValue: PostContextType = {
  post: {} as PostType,
  posts: {} as PostType[],
  caption: '',
  setPost: () => {
    throw new Error('context not initialised');
  },
  setPosts: () => {
    throw new Error('context not initialised');
  },
  setCaption: () => {
    throw new Error('context not initialised');
  },
  postsAmount: 0,
  setPostsAmount: async () => {
    throw new Error('context not initialised');
  },
  setFile: () => {
    throw new Error('context not initialised');
  },
  addPost: async () => {
    throw new Error('context not initialised');
  },
  getPosts: async () => {
    throw new Error('context not initialised');
  },
  toggleLikePost: async () => {
    throw new Error('context not initialised');
  },
  toggleSavePost: async () => {
    throw new Error('context not initialised');
  },
  getUserPostsByUserId: async () => {
    throw new Error('context not initialised');
  },
  getPostById: async () => {
    throw new Error('context not initialised');
  },
};

type PostContextProviderProps = {
  children: ReactNode;
};
export const PostContext = createContext<PostContextType>(initPostContextValue);

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [post, setPost] = useState<PostType | null>(null);
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [_, setFile] = useState<React.MutableRefObject<File | null>>();
  const [caption, setCaption] = useState<string>('');
  const [postsAmount, setPostsAmount] = useState(0);
  const { getCommentsByIds } = useContext(CommentContext);
  const { getUserProfile, user } = useContext(AuthContext);

  const addPost = async (formData: FormData) => {
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
        getPosts();
        if (post) {
          getCommentsByIds(post?.comments);
        }
      }
    } catch (error) {
      console.error('Error by adding post', error);
    }
  };

  const getPosts = async () => {
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
  const getPostById = async (postId: string) => {
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

  const getUserPostsByUserId = async (userId: string) => {
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
        post && (await getPostById(post?._id));
        setPosts(result);
        console.log('resul users posts', result);

        //setPostsAmount(result.length);
      }
    } catch (error) {
      console.error('Error fetching user posts', error);
    }
  };

  const toggleLikePost = async (postId: string) => {
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

  const toggleSavePost = async (postId: string, userId: string) => {
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
      //////////

      if (response.status === 200) {
        const updatedUser = response.data;
        //console.log('updated user after saving post', updatedUser);
        getUserProfile();
        //setUser(updatedUser);
        console.log(' user from post context', user);
        console.log('updated user from post context', updatedUser);
      }
    } catch (error) {
      console.error('Error toggling save on post:', error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        getPostById,
        toggleSavePost,
        toggleLikePost,
        setPostsAmount,
        postsAmount,
        post,
        posts,
        setPosts,
        getPosts,
        addPost,
        setPost,
        setFile,
        setCaption,
        caption,
        getUserPostsByUserId,
      }}>
      {children}
    </PostContext.Provider>
  );
};
