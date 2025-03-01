import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';
import {
  validateEmail,
  validateFullname,
  validatePassword,
  validateUsername,
} from '../utils/validation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    fullname: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (
    field: 'email' | 'username' | 'fullname' | 'password',
    value: string
  ) => {
    if (field == 'email') setEmail(value);
    if (field == 'username') setUsername(value);
    if (field == 'fullname') setFullname(value);
    if (field == 'password') setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]:
        field === 'email'
          ? validateEmail(value)
          : field === 'username'
          ? validateUsername(value)
          : field === 'fullname'
          ? validateFullname(value)
          : validatePassword(value),
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const usernameError = validateUsername(username);
    const fullnameError = validateFullname(fullname);
    const passwordError = validatePassword(password);
    if (emailError || usernameError || fullnameError || passwordError) {
      return;
    }

    const result = await signUp(email, username, password, fullname);

    if (!result.success) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...(result.field ? { [result.field]: result.error } : {}),
      }));
      return;
    }

    navigate('/login', { replace: true });
  };

  return (
    <div
      data-testid='sign-up'
      className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h2 className='mb-8 text-2xl font-bold text-center text-gray-900'>
          Sign up for a new account
        </h2>
        <form className='space-y-6' onSubmit={submitForm}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-900'>
              Email
            </label>
            <div className='mt-2'>
              <input
                onChange={(e) => handleInputChange('email', e.target.value)}
                id='email'
                type='email'
                autoComplete='email'
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.email ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
              )}
            </div>
          </div>

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
            <label
              htmlFor='fullname'
              className='block text-sm font-medium text-gray-900'>
              Full Name
            </label>
            <div className='mt-2'>
              <input
                onChange={(e) => handleInputChange('fullname', e.target.value)}
                id='fullname'
                type='text'
                autoComplete='name'
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  errors.fullname ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
              />
              {errors.fullname && (
                <p className='text-red-500 text-sm mt-1'>{errors.fullname}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-900'>
              Password
            </label>
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

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-md'>
            Sign up
          </button>
        </form>
        <p className='mt-10 text-center text-sm text-gray-500'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='font-semibold leading-6 text-blue-600 hover:text-blue-500'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
