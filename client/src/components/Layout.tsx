import { Outlet } from 'react-router-dom';
import NavComponent from './NavComponent';

const Layout = () => {
  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='w-full lg:w-64 bg-white h-auto lg:h-screen shadow-md lg:fixed'>
        <NavComponent />
      </div>

      <div className='flex-1 p-4 lg:ml-64'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
