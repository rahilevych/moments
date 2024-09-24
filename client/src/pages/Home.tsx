import { useContext, useEffect, useState } from 'react';
import HistoryComponent from '../components/HistoryComponent';
import PostComponent from '../components/PostComponent';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { profileUser, fetchUser } = useContext(UserContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  console.log(id);

  useEffect(() => {
    id && fetchUser(id);
    console.log('user', user);
  }, [id]);

  return (
    <div className='home flex flex-col items-center'>
      <div className='flex flex-col items-start w-full p-4'>
        <div className='text-lg font-medium mb-2'>Recommendations for you</div>
        <hr className='border-t border-gray-300 w-full mb-4' />
      </div>
      <div className='histories flex overflow-x-auto w-full bg-white p-4 border-b border-gray-200'>
        <HistoryComponent />
        <HistoryComponent />
        <HistoryComponent />
        <HistoryComponent />
        <HistoryComponent />
      </div>

      <div className='posts flex flex-col items-center w-full bg-white'>
        {profileUser &&
          profileUser.following
            .flatMap((followedUser) =>
              followedUser.posts.map((post) => ({
                ...post,
              }))
            )
            .map((post) => <PostComponent key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Home;
