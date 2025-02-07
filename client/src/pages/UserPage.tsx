import { useEffect } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import UserPosts from '../components/UserPosts';

import { useParams } from 'react-router-dom';
import { getUserById } from '../services/userService';
import { useUser } from '../hooks/useUser';
import { usePost } from '../hooks/usePost';

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const { setProfileUser } = useUser();
  const { posts, fetchPosts } = usePost();

  const init = async () => {
    if (id) {
      setProfileUser(await getUserById(id));
      fetchPosts(id);
    }
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <div className='profile-page flex flex-col items-center px-4 sm:px-8 py-4 sm:py-8'>
      <ProfileHeader />
      <div className='w-full max-w-4xl'>{posts && <UserPosts />}</div>
    </div>
  );
};

export default UserPage;
