import { useContext, useEffect } from 'react';
import HistoryComponent from '../components/HistoryComponent';
import PostComponent from '../components/PostComponent';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { fetchData } from '../services/userService';
import { PostContext } from '../context/PostContext';

const Home = () => {
  const { user, profileUser, setUser } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    fetchData(setUser, setPosts);

    console.log('user>>.', user);
    console.log('userprofile', profileUser);
    console.log('posts', posts);
    // if (user) {
    //   getUserById(user._id, setUser);
    // } else {
    //   console.log('Loading user...');
    // }
  }, []);

  return (
    user && (
      <div className=' flex flex-col items-center w-full'>
        <div className='flex flex-col items-start w-full p-4'>
          <div className='text-lg font-medium mb-2'>
            Recommendations for you
          </div>
          <hr className='border-t border-gray-300 w-full mb-4' />
        </div>
        <div className=' flex overflow-x-auto w-full bg-white p-4 border-b border-gray-200'>
          <HistoryComponent />
          <HistoryComponent />
          <HistoryComponent />
          <HistoryComponent />
          <HistoryComponent />
        </div>
        <div className=' flex flex-col items-center w-full bg-white justify-center'>
          {user?.following?.length
            ? user.following
                .flatMap((followedUser) => followedUser.posts || [])
                .map((post) => (
                  <NavLink
                    key={post._id}
                    to={`../${user._id}/post/${post._id}`}
                    className='w-full flex items-start justify-center'>
                    <PostComponent post={post} />
                  </NavLink>
                ))
            : posts &&
              // [...posts]
              // .sort(() => Math.random() - 0.5)
              posts.map((post) => (
                <NavLink
                  key={post._id}
                  to={`../${user._id}/post/${post._id}`}
                  className='w-full flex items-start justify-center'>
                  <PostComponent post={post} />
                </NavLink>
              ))}
        </div>
      </div>
    )
  );
};

export default Home;
