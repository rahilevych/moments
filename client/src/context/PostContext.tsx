import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { PostType } from '../types/PostType';
import { getPostById, getUserPostsByUserId } from '../services/postServices';
import socket from '../services/socketService';

type PostContextType = {
  currentPost: PostType | null;
  posts: PostType[] | null;
  setCurrentPost: Dispatch<SetStateAction<PostType | null>>;
  setPosts: Dispatch<SetStateAction<PostType[] | null>>;
  setFile: Dispatch<SetStateAction<React.MutableRefObject<File | null>>>;
  setCaption: Dispatch<SetStateAction<string>>;
  caption: string;
  fetchPost: (id: string) => Promise<PostType>;
  fetchPosts: (id: string) => Promise<void>;
  updatePostLikes: (updatedPost: PostType) => void;
};

export const PostContext = createContext<PostContextType | undefined>(
  undefined
);
type PostContextProviderProps = {
  children: ReactNode;
};

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [currentPost, setCurrentPost] = useState<PostType | null>(null);
  const [posts, setPosts] = useState<PostType[] | null>(null);

  const [_, setFile] = useState<React.MutableRefObject<File | null>>({
    current: null,
  });
  const [caption, setCaption] = useState<string>('');

  const fetchPost = async (id: string) => {
    try {
      const response = await getPostById(id);

      if (!response.success) {
        return;
      }

      setCurrentPost(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };
  const fetchPosts = async (id: string) => {
    try {
      const response = await getUserPostsByUserId(id);
      if (!response.success) {
        return;
      }
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const updatePostLikes = (updatedPost: PostType) => {
    setPosts((prevPosts) =>
      prevPosts
        ? prevPosts.map((p) =>
            p._id === updatedPost._id
              ? { ...p, likes: [...updatedPost.likes] }
              : p
          )
        : []
    );

    setCurrentPost((prev) =>
      prev && prev._id === updatedPost._id
        ? { ...prev, likes: [...updatedPost.likes] }
        : prev
    );
  };

  useEffect(() => {
    const handleUpdateLikes = ({ currentPost }: { currentPost: PostType }) => {
      console.log('Received update_likes event:', currentPost);
      try {
        updatePostLikes(currentPost);
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    };

    socket.on('update_likes', handleUpdateLikes);

    return () => {
      socket.off('update_likes', handleUpdateLikes);
    };
  }, []);

  return (
    <PostContext.Provider
      value={{
        currentPost,
        posts,
        setPosts,
        setCurrentPost,
        setFile,
        setCaption,
        caption,
        fetchPost,
        fetchPosts,
        updatePostLikes,
      }}>
      {children}
    </PostContext.Provider>
  );
};
