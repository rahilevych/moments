import { useContext, useEffect } from 'react';
import { PostContext } from '../context/PostContext';

import { NavLink } from 'react-router-dom';
import { getUserPostsByUserId } from '../services/postServices';
import { UserContext } from '../context/UserContext';

const UserPosts = () => {
  const { posts, post, setPosts } = useContext(PostContext);
  const { user } = useContext(UserContext);
  console.log('profile user from userposts', user);
  console.log(post);
  useEffect(() => {
    if (user) {
      post && getUserPostsByUserId(user._id, setPosts);
    }
    // }, [profileUser, getUserPostsByUserId]);
  }, []);

  if (!user) {
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
