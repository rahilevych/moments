import { ReactNode, createContext, useState } from 'react';
import { UserType } from '../types/UserType';
import axios from 'axios';

type AuthContextType = {
  user: UserType | null;
  username: string;
  password: string;
  setUser: (user: UserType) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
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
  username: '',
  password: '',
  setUser: () => {
    throw new Error('context not initialised');
  },
  setPassword: () => {
    throw new Error('context not initialised');
  },

  setUsername: () => {
    throw new Error('context not initialised');
  },
  signUp: () => Promise.resolve(),
  signIn: () => Promise.resolve(),

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
  let [user, setUser] = useState<UserType | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  console.log(password);
  console.log(username);

  //   const [email, setEmail] = useState('');
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const [loggedOut, setLoggedOut] = useState(false);
  //   const [signUpPressed, setSignUpPressed] = useState(true);
  //   const [loginPressed, setLoginPressed] = useState(false);

  const signUp = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4003/users/registration',
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        const result = response.data;
        console.log('Новый пользователь', result);
        setUser(result);
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
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
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
      }
    } catch (error) {
      console.error('Error during signing in', error);
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
        user,
        username,
        password,
        setUser,
        signUp,
        signIn,
        setPassword,
        setUsername,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
