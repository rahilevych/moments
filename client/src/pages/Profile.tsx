import React, { useState, useRef, useEffect } from 'react';

import { UserType } from '../types/UserType';
import { User as UserImg } from '@phosphor-icons/react';
import { getUserById, updateUser } from '../services/userService';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (formData) {
      setFormData((prevData) => ({
        ...prevData!,
        [name as keyof UserType]: value,
      }));
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        setFormData((prevData) => ({
          ...prevData!,
          user_img: result,
        }));
      };
    }
  };

  const handleSaveUpdates = async () => {
    if (!user || !formData || !id) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('fullname', formData.fullname);
      formDataToSend.append('email', formData.email);
      if (avatarFile) {
        formDataToSend.append('user_img', formData.user_img);
      }

      const response = await updateUser(user, formDataToSend);
      if (!response.success) {
        console.error('Error updating user:', response.error);
        return;
      }

      const updatedUser = await getUserById(user._id);
      if (updatedUser.success) {
        setUser(updatedUser.data);
      } else {
        console.error('Failed to fetch updated user:', updatedUser.error);
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleClickFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='container bg-white flex flex-col items-center justify-start gap-10 p-10 min-h-screen'>
      <div className='flex flex-col items-center h-full'>
        <div className='relative'>
          {formData?.user_img ? (
            <img
              alt='avatar'
              src={formData.user_img}
              className='w-32 h-32 rounded-full border-4 border-purple-500 object-cover'
            />
          ) : (
            <UserImg
              size={32}
              className='w-32 h-32 rounded-full border-4 border-purple-500 object-cover'
            />
          )}

          {isEditing && (
            <button
              className='absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 shadow-md border border-white'
              onClick={handleClickFileInput}>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7 7l10 10M17 7l-10 10'></path>
              </svg>
            </button>
          )}
          <input
            type='file'
            accept='image/*'
            onChange={handleAvatarChange}
            className='hidden'
            ref={fileInputRef}
            name='avatar'
          />
        </div>
        <h1 className='text-2xl font-semibold mt-4 text-gray-800'>
          {formData?.username}
        </h1>
      </div>
      <div className='flex flex-col gap-3 mt-2 w-full sm:w-96'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Email:
          </label>
          <input
            type='email'
            name='email'
            value={formData?.email ?? ''}
            onChange={handleChange}
            disabled={!isEditing}
            className='mt-1 block w-full sm:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Username:
          </label>
          <input
            type='text'
            name='username'
            value={formData?.username ?? ''}
            onChange={handleChange}
            disabled={!isEditing}
            className='mt-1 block w-full sm:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Full Name:
          </label>
          <input
            type='text'
            name='fullname'
            value={formData?.fullname ?? ''}
            onChange={handleChange}
            disabled={!isEditing}
            className='mt-1 block w-full sm:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500'
          />
        </div>
      </div>
      <div className='flex justify-center gap-5 mt-5 w-full'>
        <button
          className={`px-4 py-2 rounded-md font-semibold text-white transition-colors ${
            isEditing
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
        {isEditing && (
          <button
            onClick={handleSaveUpdates}
            className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors'>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
