import React, { useState } from 'react';

const AddPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  //   const handleImageChange = (e) => {
  //     setImage(URL.createObjectURL(e.target.files[0]));
  //   };

  //   const handleCaptionChange = (e) => {
  //     setCaption(e.target.value);
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Логика отправки поста на сервер
  //     console.log({ image, caption });
  //   };

  return (
    <div className='min-h-screen flex items-center justify-center '>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4'>Add a New Post</h2>
        <form>
          <div className='mb-4'>
            <label
              className='block text-sm font-medium text-gray-700 mb-2'
              htmlFor='image'>
              Upload Image
            </label>
            <input
              type='file'
              id='image'
              accept='image/*'
              //   onChange={handleImageChange}
              className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
            />
            {image && (
              <img
                src={image}
                alt='Selected'
                className='mt-4 w-full h-64 object-cover rounded'
              />
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-sm font-medium text-gray-700 mb-2'
              htmlFor='caption'>
              Caption
            </label>
            <textarea
              id='caption'
              value={caption}
              //   onChange={handleCaptionChange}
              //   rows="3"
              className='block w-full p-2 border border-gray-300 rounded'
              placeholder='Write a caption...'></textarea>
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
