import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { CommentType } from '../types/CommentType';

type CommentContextType = {
  comment: CommentType | null;
  setComment: Dispatch<SetStateAction<CommentType | null>>;
  comments: CommentType[];
  setComments: Dispatch<SetStateAction<CommentType[]>>;
};

type CommentContextProviderProps = {
  children: ReactNode;
};

export const CommentContext = createContext<CommentContextType | undefined>(
  undefined
);

export const CommentContextProvider = ({
  children,
}: CommentContextProviderProps) => {
  const [comment, setComment] = useState<CommentType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  return (
    <CommentContext.Provider
      value={{
        comment,
        setComment,
        comments,
        setComments,
      }}>
      {children}
    </CommentContext.Provider>
  );
};
