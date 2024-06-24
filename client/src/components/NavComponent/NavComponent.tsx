import {
  Heart,
  House,
  MagnifyingGlass,
  PaperPlaneTilt,
  PlusSquare,
} from '@phosphor-icons/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavComponent = () => {
  return (
    <nav className='flex flex-col items-start p-4 space-y-6'>
      <NavLink to={'/'}>
        <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
          <House size={32} />
          <p>Home</p>
        </div>
      </NavLink>

      <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
        <MagnifyingGlass size={32} />
        <p>Search</p>
      </div>
      <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
        <PaperPlaneTilt size={32} />
        <p>Messages</p>
      </div>
      <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
        <Heart size={32} />
        <p>Notifications</p>
      </div>
      <NavLink to={'/add-post'}>
        {' '}
        <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'>
          <PlusSquare size={32} />
          <p>Create</p>
        </div>
      </NavLink>
    </nav>
  );
};

export default NavComponent;
