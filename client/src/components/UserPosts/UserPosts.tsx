// PostGridComponent.jsx
import React from 'react';
import postimg from '../../assets/images/postimg.png';

const UserPosts = () => {
  const posts = [
    postimg,
    postimg,
    postimg,
    postimg,
    postimg,
    postimg,
    postimg,
    postimg,
    postimg,
  ]; // Пример массива постов

  return (
    <div className='post-grid grid grid-cols-3 gap-2 p-4'>
      {posts.map((post, index) => (
        <div key={index} className='post-item w-full h-48 overflow-hidden'>
          <img src={post} alt='Post' className='w-full h-full object-cover' />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
