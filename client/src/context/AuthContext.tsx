import { ReactNode, createContext, useState } from 'react';
import { UserType } from '../types/UserType';

// define the type of my context
type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
};

//define the initial value of the context
const initContextValue = {
  user: {} as UserType,
  setUser: () => {
    throw new Error('context not initialised');
  },
};

//define type of the props the AuthContextProvider receives
type AuthContextProviderProps = {
  children: ReactNode;
};

//1. create context
export const AuthContext = createContext<AuthContextType>(initContextValue);

//2. create provider
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // move inside states and functions
  const [user, setUser] = useState<UserType | null>(null);

  //2. return the provider fo the context and the values to share
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
