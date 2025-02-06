import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { UserType } from '../types/UserType';
import { getUserById } from '../services/userService';

type UserContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  profileUser: UserType | null;
  setProfileUser: Dispatch<SetStateAction<UserType | null>>;
  users: UserType[] | null;
  setUsers: Dispatch<SetStateAction<UserType[] | null>>;
  followingUser: UserType | null;
  setFollowingUser: Dispatch<SetStateAction<UserType | null>>;
  fetchUser: (id: string) => Promise<void>;
  fetchUsers: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [followingUser, setFollowingUser] = useState<UserType | null>(null);
  const [profileUser, setProfileUser] = useState<UserType | null>(null);

  const fetchUser = async (id: string) => {
    try {
      const userData = await getUserById(id);
      if (userData) setUser(userData);
    } catch (error) {
      console.error('Cannot find a user, try again');
    }
  };

  const fetchUsers = async () => {
    try {
      profileUser && setUsers(profileUser.followers);
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        profileUser,
        setProfileUser,
        users,
        setUsers,
        followingUser,
        setFollowingUser,
        fetchUser,
        fetchUsers,
      }}>
      {children}
    </UserContext.Provider>
  );
};
