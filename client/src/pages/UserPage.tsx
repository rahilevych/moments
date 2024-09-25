import { useContext, useEffect } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import UserPosts from '../components/UserPosts';
import { PostContext } from '../context/PostContext';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../services/userService';
import { UserContext } from '../context/UserContext';
import { getUserPostsByUserId } from '../services/postServices';

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const { setUser, setProfileUser } = useContext(UserContext);
  const { setPosts } = useContext(PostContext);

  useEffect(() => {
    if (id) {
      fetchUser(id, setProfileUser);
      getUserPostsByUserId(id, setPosts);
    }
  }, [id]);

  return (
    <div className='profile-page flex flex-col items-center '>
      <ProfileHeader />
      <UserPosts />
    </div>
  );
};

export default UserPage;
