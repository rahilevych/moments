import { ReactNode, createContext, useState } from 'react';
import { UserType } from '../types/UserType';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/tokenServices';
import { baseUrl } from '../utils/baseUrl';

type AuthContextType = {
  user: UserType | null;

  email: string;
  username: string;
  password: string;
  fullname: string;

  setUser: (user: UserType | null) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;

  setEmail: (username: string) => void;
  setFullname: (password: string) => void;

  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
  getUserProfile: () => Promise<void>;
  logout: () => void;
};

const initAuthContextValue = {
  user: {} as UserType,
  token: '',

  username: '',
  password: '',
  email: '',
  fullname: '',
  followersAmount: 0,
  followingAmount: 0,

  setUser: () => {
    throw new Error('context not initialised');
  },
  setToken: () => {
    throw new Error('context not initialised');
  },
  setPassword: () => {
    throw new Error('context not initialised');
  },

  setUsername: () => {
    throw new Error('context not initialised');
  },
  setEmail: () => {
    throw new Error('context not initialised');
  },

  setFullname: () => {
    throw new Error('context not initialised');
  },
  setFollowersAmount: () => {
    throw new Error('context not initialised');
  },

  setFollowingAmount: () => {
    throw new Error('context not initialised');
  },

  signUp: () => Promise.resolve(),
  signIn: () => Promise.resolve(),
  getUserProfile: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

type AuthContextProviderProps = {
  children: ReactNode;
};
export const AuthContext = createContext<AuthContextType>(initAuthContextValue);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<UserType | null>(null);

  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const response = await axios.post(`${baseUrl}/users/registration`, {
        email,
        username,
        password,
        fullname,
      });

      if (response.status === 201) {
        // const result = response.data;
        // //setUser(result);
        navigate('/login');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error with data:', error.response?.data);
        console.error('Axios error :', error.message);
      } else {
        console.error('Error by signing up:', error);
      }
    }
  };

  const signIn = async () => {
    try {
      const response = await axios.post(`${baseUrl}/users/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        const result = response.data;

        const isUserLogged = getToken();
        if (isUserLogged) {
          getUserProfile();
          console.log('user is logged in');
        } else {
          console.log('user is logged out');
        }
        if (result.token) {
          localStorage.setItem('token', result.token);

          navigate('user/home');
        }
      }
    } catch (error) {
      console.error('Error during signing in', error);
    }
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const user = response.data.user;
        setUser(user);
      }
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        logout,

        user,
        email,
        username,
        password,
        fullname,

        setUser,
        signUp,
        signIn,

        setPassword,
        setUsername,
        setFullname,
        setEmail,

        getUserProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
