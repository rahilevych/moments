import React, { useContext, useEffect, useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import UserPosts from '../components/UserPosts';
import { PostContext } from '../context/PostContext';
import { useParams } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { getUserPostsByUserId } from '../services/postServices';
import { getUserById } from '../services/userService';

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const { setProfileUser } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

  const init = async () => {
    if (id) {
      setProfileUser(await getUserById(id));
      setPosts(await getUserPostsByUserId(id));
    }
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <div className='profile-page flex flex-col items-center'>
      <ProfileHeader />
      {posts && <UserPosts posts={posts} />}
    </div>
  );
};

export default UserPage;
