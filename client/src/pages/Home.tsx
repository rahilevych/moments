import { useEffect } from 'react';
import PostComponent from '../components/PostComponent';

import { usePost } from '../hooks/usePost';

import { getPosts } from '../services/postServices';

const Home = () => {
  const { posts, setPosts } = usePost();

  const fetchHome = async () => {
    try {
      const response = await getPosts();

      if (!response.success) {
        return;
      }

      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching home posts:', error);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  return (
    <div data-testid='home' className=' flex flex-col items-center w-full'>
      <div className='flex flex-col items-start w-full p-4'>
        <div className='text-lg font-medium mb-2'>Recommendations for you</div>
        <hr className='border-t border-gray-300 w-full mb-4' />
      </div>

      <div className=' flex flex-col items-center w-full bg-white justify-center'>
        {posts &&
          posts.map((post, index) => (
            <PostComponent postId={post._id} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Home;
