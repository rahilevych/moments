import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { PostType } from '../types/PostType';
import { getPostById } from '../services/postServices';

type PostContextType = {
  post: PostType | null;
  posts: PostType[] | null;
  setPost: Dispatch<SetStateAction<PostType | null>>;
  setPosts: Dispatch<SetStateAction<PostType[] | null>>;
  setFile: Dispatch<SetStateAction<React.MutableRefObject<File | null>>>;
  setCaption: Dispatch<SetStateAction<string>>;
  caption: string;
  fetchPost: (id: string) => Promise<void>;
  fetchPosts: () => Promise<void>;
};

export const PostContext = createContext<PostContextType | undefined>(
  undefined
);
type PostContextProviderProps = {
  children: ReactNode;
};

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [post, setPost] = useState<PostType | null>(null);
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [_, setFile] = useState<React.MutableRefObject<File | null>>({
    current: null,
  });
  const [caption, setCaption] = useState<string>('');

  const fetchPost = async (id: string) => {
    try {
      setPost(await getPostById(id));
    } catch (error) {}
  };
  const fetchPosts = async () => {
    try {
    } catch (error) {}
  };

  return (
    <PostContext.Provider
      value={{
        post,
        posts,
        setPosts,
        setPost,
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
