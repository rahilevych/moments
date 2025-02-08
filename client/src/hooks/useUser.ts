import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('Use app context within provider!');
  return context;
};
