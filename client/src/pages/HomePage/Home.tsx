import React from 'react';
import HistoryComponent from '../../components/HistoryComponent/HistoryComponent';
import PostComponent from '../../components/PostComponent/PostComponent';

const Home = () => {
  return (
    <div className='home flex flex-col items-center'>
      {/* Истории */}
      <div className='histories flex overflow-x-auto w-full bg-white p-4 border-b border-gray-200'>
        <HistoryComponent />
        <HistoryComponent />
        <HistoryComponent />
        <HistoryComponent />
        <HistoryComponent />
        {/* Добавьте больше HistoryComponent при необходимости */}
      </div>
      {/* Посты */}
      <div className='posts flex flex-col items-center w-full bg-white'>
        <PostComponent />
        <PostComponent />
        <PostComponent />
        {/* Добавьте больше PostComponent при необходимости */}
      </div>
    </div>
  );
};

export default Home;
