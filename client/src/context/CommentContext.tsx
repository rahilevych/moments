import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { CommentType } from '../types/CommentType';
import { PostType } from '../types/PostType';

type CommentContextType = {
  comment: CommentType | null;
  setComment: Dispatch<SetStateAction<CommentType | null>>;
  setCurrentPost: Dispatch<SetStateAction<PostType | null>>;
  comments: CommentType[];
  setComments: Dispatch<SetStateAction<CommentType[]>>;
  setText: Dispatch<SetStateAction<string>>;
  text: string;
  setCaption: Dispatch<SetStateAction<string>>;
};

const initCommentContextValue: CommentContextType = {
  comment: null,
  setComment: () => {
    throw new Error('context not initialised');
  },
  setCurrentPost: () => {
    throw new Error('context not initialised');
  },
  comments: [],
  setComments: () => {
    throw new Error('context not initialised');
  },
  text: '',
  setText: () => {
    throw new Error('context not initialised');
  },
  setCaption: () => {
    throw new Error('context not initialised');
  },
};

type CommentContextProviderProps = {
  children: ReactNode;
};

export const CommentContext = createContext<CommentContextType>(
  initCommentContextValue
);

export const CommentContextProvider = ({
  children,
}: CommentContextProviderProps) => {
  const [comment, setComment] = useState<CommentType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [text, setText] = useState<string>('');
  const [, setCurrentPost] = useState<PostType | null>(null);

  const [, setCaption] = useState<string>('');

  return (
    <CommentContext.Provider
      value={{
        comment,
        setComment,
        comments,
        setComments,
        text,
        setText,
        setCurrentPost,
        setCaption,
      }}>
      {children}
    </CommentContext.Provider>
  );
};
