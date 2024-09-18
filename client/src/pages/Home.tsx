import React, { useContext, useEffect } from 'react';
import HistoryComponent from '../components/HistoryComponent';
import PostComponent from '../components/PostComponent';

import { AuthContext } from '../context/AuthContext';

const Home = () => {
  return (
    <div className='home flex flex-col items-center'>
      <div className='histories flex overflow-x-auto w-full bg-white p-4 border-b border-gray-200'>
        <HistoryComponent />
        <HistoryComponent />
        <HistoryComponent />
        <HistoryComponent />
        <HistoryComponent />
      </div>

      <div className='posts flex flex-col items-center w-full bg-white'>
        <PostComponent />
        <PostComponent />
        <PostComponent />
      </div>
    </div>
  );
};

export default Home;
