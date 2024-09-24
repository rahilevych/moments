import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { UserType } from '../types/UserType';

type UserContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  users: UserType[] | null;
  setUsers: Dispatch<SetStateAction<UserType[] | null>>;
  followingUser: UserType | null;
  setFollowingUser: Dispatch<SetStateAction<UserType | null>>;
};

const initUserContextValue: UserContextType = {
  user: null,
  setUser: () => {
    throw new Error('context not initialised');
  },
  users: null,
  setUsers: () => {
    throw new Error('context not initialised');
  },
  followingUser: null,
  setFollowingUser: () => {
    throw new Error('context not initialised');
  },
};

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType>(initUserContextValue);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [followingUser, setFollowingUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        followingUser,
        setFollowingUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};
