import React from 'react';
import profile from '../../assets/images/profile.png';
const HistoryComponent = () => {
  return (
    <div className='history flex flex-col items-center mx-2'>
      <div className='history__img rounded-full w-16 h-16 bg-gray-700 border-solid border-4 border-indigo-600'>
        <img
          className='rounded-full w-full h-full object-cover'
          src={profile}
          alt=''
        />
      </div>
      <div className='history__username text-sm mt-2'>username</div>
    </div>
  );
};

export default HistoryComponent;
