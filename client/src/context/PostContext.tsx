import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { PostType } from '../types/PostType';
import { getPostById, getUserPostsByUserId } from '../services/postServices';

type PostContextType = {
  currentPost: PostType | null;
  posts: PostType[] | null;
  setCurrentPost: Dispatch<SetStateAction<PostType | null>>;
  setPosts: Dispatch<SetStateAction<PostType[] | null>>;
  setFile: Dispatch<SetStateAction<React.MutableRefObject<File | null>>>;
  setCaption: Dispatch<SetStateAction<string>>;
  caption: string;
  fetchPost: (id: string) => Promise<void>;
  fetchPosts: (id: string) => Promise<void>;
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
    } catch (error) {}
  };
  const fetchPosts = async (id: string) => {
    try {
      const data = await getUserPostsByUserId(id);
      setPosts(data);
    } catch (error) {}
  };

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
      }}>
      {children}
    </PostContext.Provider>
  );
};
