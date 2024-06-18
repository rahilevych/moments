// ProfileHeaderComponent.jsx
import React from 'react';
import profile from '../../assets/images/profile.png';

const ProfileHeader = () => {
  return (
    <div className='profile-header flex flex-col items-center md:flex-row md:justify-between p-4 border-b border-gray-200'>
      <div className='profile-avatar w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden'>
        <img
          src={profile}
          alt='Profile'
          className='w-full h-full object-cover'
        />
      </div>
      <div className='profile-info flex flex-col md:ml-6 mt-4 md:mt-0'>
        <h2 className='text-2xl font-bold'>username</h2>
        <div className='stats flex mt-2'>
          <div className='mr-4'>
            <span className='font-bold'>150</span> posts
          </div>
          <div className='mr-4'>
            <span className='font-bold'>200k</span> followers
          </div>
          <div className='mr-4'>
            <span className='font-bold'>180</span> following
          </div>
        </div>
        <button className='mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700'>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
