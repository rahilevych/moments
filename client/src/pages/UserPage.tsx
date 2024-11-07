import { useContext, useEffect } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import UserPosts from '../components/UserPosts';
import { PostContext } from '../context/PostContext';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getUserPostsByUserId } from '../services/postServices';
import { getUserById } from '../services/userService';

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const { setProfileUser } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

  const init = async () => {
    if (id) {
      setProfileUser(await getUserById(id));
      setPosts(await getUserPostsByUserId(id));
    }
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <div className='profile-page flex flex-col items-center px-4 sm:px-8 py-4 sm:py-8'>
      <ProfileHeader />
      <div className='w-full max-w-4xl'>
        {posts && <UserPosts posts={posts} />}
      </div>
    </div>
  );
};

export default UserPage;
