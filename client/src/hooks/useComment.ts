import { useContext } from 'react';
import { CommentContext } from '../context/CommentContext';

export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) throw new Error('Use app context within provider!');
  return context;
};
