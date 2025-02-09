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
      const data = await getPostById(id);
      setCurrentPost(data);
      return data;
    } catch (error) {}
  };
  const fetchPosts = async (id: string) => {
    try {
      const data = await getUserPostsByUserId(id);
      setPosts(data);
    } catch (error) {}
  };

  const updatePostLikes = (updatedPost: PostType) => {
    setPosts((prevPosts) =>
      prevPosts
        ? [
            ...prevPosts.map((p) =>
              p._id === updatedPost._id ? { ...p, likes: updatedPost.likes } : p
            ),
          ]
        : null
    );

    setCurrentPost((prev) =>
      prev && prev._id === updatedPost._id
        ? { ...prev, likes: updatedPost.likes }
        : prev
    );
  };

  useEffect(() => {
    socket.on('update_likes', ({ post }) => {
      updatePostLikes(post);
    });

    return () => {
      socket.off('update_likes');
    };
  }, [currentPost]);

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
