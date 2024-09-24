import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { PostType } from '../types/PostType';

type PostContextType = {
  post: PostType | null;
  posts: PostType[] | null;
  setPost: Dispatch<SetStateAction<PostType | null>>;
  setPosts: Dispatch<SetStateAction<PostType[] | null>>;
  setFile: Dispatch<SetStateAction<React.MutableRefObject<File | null>>>;
  setCaption: Dispatch<SetStateAction<string>>;
  caption: string;
};

const initPostContextValue: PostContextType = {
  post: null,
  posts: null,
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
  setFile: () => {
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
  const [_, setFile] = useState<React.MutableRefObject<File | null>>({
    current: null,
  });
  const [caption, setCaption] = useState<string>('');

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
      }}>
      {children}
    </PostContext.Provider>
  );
};
