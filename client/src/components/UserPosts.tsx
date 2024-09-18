import React, { useContext, useEffect } from 'react';
import { PostContext } from '../context/PostContext';
import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';

const UserPosts = () => {
  const { getUserPostsByUserId, posts } = useContext(PostContext);
  const { profileUser } = useContext(UserContext);
  console.log('profile user from userposts', profileUser);

  useEffect(() => {
    if (profileUser) {
      getUserPostsByUserId(profileUser._id);
    }
    // }, [profileUser, getUserPostsByUserId]);
  }, []);

  if (!profileUser) {
    return null;
  }

  return (
    <div className='post-grid grid grid-cols-3 gap-2 p-4'>
      {posts?.map((post) => (
        <NavLink key={post._id} to={`post/${post._id}`}>
          <div className='post-item w-full h-48 overflow-hidden'>
            <img
              src={post.image_url}
              alt='Post'
              className='w-full h-full object-cover'
            />
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default UserPosts;
