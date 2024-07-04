import { ReactNode, createContext, useState } from 'react';
import { UserType } from '../types/UserType';
import axios from 'axios';

type AuthContextType = {
  user: UserType | null;
  token: string;
  email: string;
  username: string;
  password: string;
  fullname: string;

  setUser: (user: UserType) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setEmail: (username: string) => void;
  setFullname: (password: string) => void;
  setToken: (token: string) => void;

  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
  getUserProfile: () => Promise<void>;

  //email: string;
  //setEmail: (email: string) => void;
  // setSignUpPressed: (isPressed: boolean) => void;
  // setLoginPressed: (isPressed: boolean) => void;
  // loginPressed: boolean;
  // signUpPressed: boolean;

  // logOut: () => Promise<void>;
  // isLoggedIn: boolean;
};

//define the initial value of context
const initAuthContextValue = {
  user: {} as UserType,
  token: '',

  username: '',
  password: '',
  email: '',
  fullname: '',

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

  signUp: () => Promise.resolve(),
  signIn: () => Promise.resolve(),
  getUserProfile: () => Promise.resolve(),

  //   setEmail: () => {
  //     throw new Error('context not initialised');
  //   },

  //   logOut: () => Promise.resolve(),
  //   email: '',
  //   password: '',
  //   loggedIn: false,
  //   isLoggedIn: false,
  //   setSignUpPressed: () => {
  //     throw new Error('context not initialised');
  //   },
  //   setLoginPressed: () => {
  //     throw new Error('context not initialised');
  //   },
  //   loginPressed: false,
  //   signUpPressed: false,
};

//define type of props the AuthContextProvider recived

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
  const [token, setToken] = useState<string>('');

  console.log(password);
  console.log(username);
  console.log(email);
  console.log(fullname);

  const signUp = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4003/users/registration',
        {
          email,
          username,
          password,
          fullname,
        }
      );

      if (response.status === 201) {
        const result = response.data;
        console.log('New user', result);
        setUser(result);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error response data:', error.response?.data);
        console.error('Axios error message:', error.message);
      } else {
        console.error('Error by signing up:', error);
      }
    }
  };

  const signIn = async () => {
    try {
      const response = await axios.post('http://localhost:4003/users/login', {
        username,
        password,
      });
      if (response.status === 200) {
        const result = response.data;
        console.log('Signed in user', result);
        setToken(result);
        if (result.token) {
          localStorage.setItem('token', result.token);
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
      const response = await axios.get('http://localhost:4003/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const user = response.data.user;
        setUser(user);
        console.log('User profile:', user);
        const userId = user.id;
        console.log('User id:', userId);
      }
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  };

  //   const stayLoggedIn = () => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     });
  //   };

  //   const logOut = async () => {
  //     try {
  //       await signOut(auth);
  //       setLoggedOut(true);
  //       setIsLoggedIn(false);
  //       setUser(null);
  //       console.log(auth.currentUser?.email);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     stayLoggedIn();
  //   }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        email,
        username,
        password,
        fullname,

        setUser,
        signUp,
        signIn,

        setToken,
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
