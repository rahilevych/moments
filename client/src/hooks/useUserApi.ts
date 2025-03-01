import { getUserById } from '../services/userService';
import { UserType } from '../types/UserType';

export const useUserApi = () => {
  const fetchUser = async (id: string): Promise<UserType | null> => {
    try {
      const response = await getUserById(id);
      if (response && response.data) {
        return response.data;
      }
      throw new Error('User not found');
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  return { fetchUser };
};
