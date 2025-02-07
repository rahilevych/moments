import { useEffect } from 'react';
import PostComponent from '../components/PostComponent';
import { NavLink } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { usePost } from '../hooks/usePost';

const Home = () => {
  const { user } = useUser();
  const { posts, fetchPosts } = usePost();

  useEffect(() => {
    user && fetchPosts(user?._id);
  }, []);

  return (
    <div className=' flex flex-col items-center w-full'>
      <div className='flex flex-col items-start w-full p-4'>
        <div className='text-lg font-medium mb-2'>Recommendations for you</div>
        <hr className='border-t border-gray-300 w-full mb-4' />
      </div>

      <div className=' flex flex-col items-center w-full bg-white justify-center'>
        {user?.following?.length
          ? user.following
              .flatMap((followedUser) => followedUser.posts || [])
              .map((post) => <PostComponent post={post} key={post._id} />)
          : posts &&
            posts.map((post) => (
              <NavLink
                key={post._id}
                to={`../${user?._id}/post/${post._id}`}
                className='w-full flex items-start justify-center'>
                <PostComponent post={post} />
              </NavLink>
            ))}
      </div>
    </div>
  );
};

export default Home;
