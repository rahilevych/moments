import React, { useState, useRef, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { UserType } from '../types/UserType';
import { User as UserImg } from '@phosphor-icons/react';
import { fetchUser, updateUser } from '../services/userService';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { user, setUser, setProfileUser } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    id && fetchUser(id, setUser);
    setFormData(user);
  }, [id]);
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
    try {
      if (user && formData && id) {
        const formDataToSend = new FormData();
        formDataToSend.append('username', formData.username);
        formDataToSend.append('fullname', formData.fullname);
        formDataToSend.append('email', formData.email);
        if (avatarFile) {
          formDataToSend.append('user_img', formData.user_img);
        }
        const data = await updateUser(user, formDataToSend);
        setUser(data);
        setIsEditing(false);
        await fetchUser(id, setUser);
      }
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
    <div className='bg-gray-100 min-h-screen flex flex-col'>
      <div className='container mx-auto p-6'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <div className='flex flex-col items-center'>
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
          <div className='mt-6 space-y-4'>
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
                className='mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500'
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
                className='mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500'
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
                className='mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white py-4 shadow-md'>
        <div className='container mx-auto flex justify-center gap-4'>
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
    </div>
  );
};

export default Profile;
