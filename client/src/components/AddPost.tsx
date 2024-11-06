import React, { useContext, useRef, useState } from 'react';
import { PostContext } from '../context/PostContext';
import { UserContext } from '../context/UserContext';
import { addPost } from '../services/postServices';
import { CommentContext } from '../context/CommentContext';
import { CaretLeft, Images } from '@phosphor-icons/react';

const AddPost = () => {
  const { setCaption, caption } = useContext(PostContext);

  const { user } = useContext(UserContext);
  const selectedFile = useRef<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPostAdded, setIsPostAdded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      selectedFile.current = e.target.files[0];
      const fileURL = URL.createObjectURL(selectedFile.current);
      setImagePreview(fileURL);
    }
  };

  const handleInputChangeCaption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };
  const handleBackToUpload = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setImagePreview(null);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile.current && user) {
      const formData = new FormData();
      formData.append('image_url', selectedFile.current);
      formData.append('caption', caption);
      formData.append('user_id', user?._id);
      await addPost(formData);
      setIsPostAdded(true);
      setImagePreview(null);
      selectedFile.current = null;
      setCaption('');
    }
  };

  return (
    <>
      {!imagePreview ? (
        <div className='flex flex-col items-center justify-center bg-white w-full h-full p-4'>
          <h2 className='font-bold text-center text-gray-600 border-b-2 border-gray-300 w-full py-2'>
            Create new post
          </h2>
          <div className='bg-white p-2 w-full h-full flex flex-col items-center justify-between '>
            <div className='p-10'>
              <label
                className='block text-sm font-medium text-gray-700 mb-2'
                htmlFor='image'>
                Drag photos here
              </label>
              <Images size={128} />
              <input
                onChange={handleFileChange}
                type='file'
                id='image'
                accept='image/*'
                className='hidden'
              />
            </div>
            <button
              type='button'
              onClick={() => document.getElementById('image')?.click()}
              className='w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300'>
              Upload Photo
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center bg-white w-full p-4'>
          <div className='flex items-center justify-between border-b-2 border-gray-300 w-full py-2'>
            <button onClick={handleBackToUpload}>
              <CaretLeft
                size={32}
                className='font-bold text-center text-gray-600 cursor-pointer'
              />
            </button>
            <h2 className='font-bold text-center text-gray-600 '>
              Create new post
            </h2>
          </div>

          <div className='bg-white p-2 w-full flex flex-col md:flex-row'>
            <div className='flex-1'>
              <img
                src={imagePreview}
                alt='Preview'
                className='w-full h-96 rounded-md'
              />
              <form onSubmit={submitForm} method='post'>
                <div className='mb-6 pt-4'>
                  <label
                    className='block text-sm font-medium text-gray-700 mb-2'
                    htmlFor='caption'>
                    Caption
                  </label>
                  <input
                    onChange={handleInputChangeCaption}
                    value={caption}
                    id='caption'
                    className='block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Write a caption...'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300'>
                  Add Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPost;
