import { useContext } from 'react';
import { PostContext } from '../context/PostContext';

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('Use app context within provider!');
  return context;
};
