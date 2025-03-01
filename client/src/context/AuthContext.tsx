import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { UserType } from '../types/UserType';
import { Socket } from 'socket.io-client';
import { initializeSocket } from '../services/socketService';

type AuthContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  socket: Socket | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (token) {
      if (socket) {
        socket.disconnect();
      }
      const newSocket = initializeSocket(token);
      setSocket(newSocket);
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        socket,
        setSocket,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
