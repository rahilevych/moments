import { ReactNode, createContext, useContext, useRef, useState } from 'react';

import axios from 'axios';
import { CommentType } from '../types/CommentType';
import { PostType } from '../types/PostType';
import { PostContext } from './PostContext';

type CommentContextType = {
  comment: CommentType | null;
  setComment: (comment: CommentType) => void;
  setCurrentPost: (post: PostType) => void;
  comments: CommentType[] | null;
  setComments: (comments: CommentType[]) => void;
  addComment: (formData: FormData, id: string) => Promise<void>;
  setText: (text: string) => void;
  text: string;
  getCommentsByIds: (commentIds: string[]) => Promise<void>; // Новый
};

const initCommentContextValue = {
  comment: {} as CommentType,
  setComment: () => {
    throw new Error('context not initialised');
  },
  setCurrentPost: () => {
    throw new Error('context not initialised');
  },
  comments: {} as CommentType[],
  setComments: () => {
    throw new Error('context not initialised');
  },
  addComment: async () => {
    throw new Error('context not initialised');
  },
  text: '',
  setText: () => {
    throw new Error('context not initialised');
  },
  getCommentsByIds: async () => {
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
  const [text, setText] = useState('');
  const [currentPost, setCurrentPost] = useState<PostType>();
  const { post, getPostById, setPost } = useContext(PostContext);

  const addComment = async (formData: FormData, id: string) => {
    await getPostById(id);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:4003/comments',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const result = response.data;
        setComment(result);
        console.log('comment that was added', result);
        await getPostById(id);

        post && (await getCommentsByIds(post?.comments));
        console.log('comments for post', post && post.comments);
      }
    } catch (error) {
      console.error('Error by adding comment', error);
    }
  };

  const getCommentsByIds = async (commentIds: string[]) => {
    post && getPostById(post?._id);
    try {
      const commentRequests = commentIds.map((id) =>
        axios.get(`http://localhost:4003/comments/${id}`)
      );
      const commentResponses = await Promise.all(commentRequests);
      const fetchedComments = commentResponses.map((response) => response.data);
      console.log('get comments by ids fetched comments', fetchedComments);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        setCurrentPost,
        comment,
        setComment,
        comments,
        setComments,
        addComment,
        text,
        setText,
        getCommentsByIds,
      }}>
      {children}
    </CommentContext.Provider>
  );
};
