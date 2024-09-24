import React, { useContext, useRef } from 'react';
import { PostContext } from '../context/PostContext';
import { UserContext } from '../context/UserContext';
import { addPost } from '../services/postServices';

const AddPost = () => {
  const { setCaption, caption, setPost, setPosts } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const selectedFile = useRef<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      selectedFile.current = e.target.files[0];
    }
  };

  const handleInputChangeCaption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile.current && user) {
      const formData = new FormData();
      formData.append('image_url', selectedFile.current);
      formData.append('caption', caption);
      formData.append('user_id', user?._id);
      await addPost(formData, setPost, setPosts);
      // return <Navigate to={`/user/${user._id}`} replace={true}></Navigate>;
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          Add a New Post
        </h2>
        <form onSubmit={submitForm} method='post'>
          <div className='mb-6'>
            <label
              className='block text-sm font-medium text-gray-700 mb-2'
              htmlFor='image'>
              Upload Image
            </label>
            <input
              onChange={handleFileChange}
              type='file'
              id='image'
              accept='image/*'
              className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-sm font-medium text-gray-700 mb-2'
              htmlFor='caption'>
              Caption
            </label>
            <input
              onChange={handleInputChangeCaption}
              id='caption'
              className='block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Write a caption...'></input>
          </div>
          <button
            type='submit'
            className='w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300'>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
