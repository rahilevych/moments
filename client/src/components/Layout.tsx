import React from 'react';

import { Outlet } from 'react-router-dom';
import NavComponent from './NavComponent';

const Layout = () => {
  return (
    <div className='flex'>
      <div className='w-64 bg-white h-screen shadow-md fixed'>
        {' '}
        <NavComponent />
      </div>
      <div className='ml-64 p-4 w-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
