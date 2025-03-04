import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile, signIn } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { validatePassword, validateUsername } from '../utils/validation';
import { useUserApi } from '../hooks/useUserApi';

const SignIn = () => {
  const { user, setUser, setToken } = useAuth();
  const { fetchUser } = useUserApi();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (field: 'username' | 'password', value: string) => {
    if (field == 'username') setUsername(value);

    if (field == 'password') setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]:
        field === 'username'
          ? validateUsername(value)
          : validatePassword(value),
    }));
  };

  const login = async () => {
    try {
      const responseSignIn = await signIn(username, password);

      if (!responseSignIn.success) {
        console.error('Login failed:', responseSignIn.error);
        setError(responseSignIn.error);
        return;
      }

      const token = responseSignIn.data;
      localStorage.setItem('token', token);
      setToken(token);

      const responseUserProfile = await getUserProfile();
      if (!responseUserProfile.success) {
        console.error('Failed to get user profile:', responseUserProfile.error);
        setError(responseUserProfile.error);
        return;
      }

      const profile = responseUserProfile.data;
      if (!profile || !profile._id) {
        console.error('Error: Profile not found');
        setError('Profile not found');
        return;
      }
      const data = await fetchUser(profile._id);
      setUser(data);
      navigate('/user/home', { replace: true });
    } catch (error) {
      console.error('Unexpected error:', error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameError = validateUsername(username);

    const passwordError = validatePassword(password);
    if (usernameError || passwordError) {
      return;
    }
    login();
  };

  useEffect(() => {
    if (user) {
      navigate('/user/home', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div
      data-testid='sign-in'
      className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h2 className='mb-8 text-2xl font-bold text-center text-gray-900'>
          Sign in to your account
        </h2>
        <form className='space-y-6' onSubmit={submitForm} method='post'>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-900'>
              Username
            </label>
            <div className='mt-2'>
              <input
                onChange={(e) => handleInputChange('username', e.target.value)}
                id='username'
                type='text'
                autoComplete='username'
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.username ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
              />
              {errors.username && (
                <p className='text-red-500 text-sm mt-1'>{errors.username}</p>
              )}
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-900'>
                Password
              </label>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-semibold text-blue-600 hover:text-blue-500'>
                  Forgot password?
                </a>
              </div>
            </div>
            <div className='mt-2'>
              <input
                onChange={(e) => handleInputChange('password', e.target.value)}
                id='password'
                type='password'
                autoComplete='new-password'
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.password ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
              />
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
              Sign in
            </button>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
          </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Don't have an account?{' '}
          <Link
            to='/'
            className='font-semibold leading-6 text-blue-600 hover:text-blue-500'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
