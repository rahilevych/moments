// ProfilePageComponent.jsx
import React from 'react';

import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import UserPosts from '../../components/UserPosts/UserPosts';

const UserPage = () => {
  return (
    <div className='profile-page flex flex-col items-center '>
      <ProfileHeader />
      <UserPosts />
    </div>
  );
};

export default UserPage;
