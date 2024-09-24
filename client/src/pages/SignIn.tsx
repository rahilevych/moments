import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { signIn } from '../services/authService';

const SignIn = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {}, [user]);
  const handleInputChangeUsername = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handleInputChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPassword(e.target.value);
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    user && signIn(username, password, user, setUser, navigate);
  };
  if (user) {
    return <Navigate to={`/user/${user._id}/home`} replace={true} />;
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h2 className='mb-8 text-2xl font-bold text-center text-gray-900'>
          Sign in to your account
        </h2>
        <form className='space-y-6' onSubmit={submitForm} method='post'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-900'>
              Username
            </label>
            <div className='mt-2'>
              <input
                onChange={handleInputChangeUsername}
                id='username'
                name='username'
                type='username'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
              />
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
                onChange={handleInputChangePass}
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
              Sign in
            </button>
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
