import { useContext, useEffect } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import UserPosts from '../components/UserPosts';
import { PostContext } from '../context/PostContext';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';

const UserPage = () => {
  //const { posts, getPosts } = useContext(PostContext);
  const { id } = useParams<{ id: string }>();
  const { getUserById, setProfileUser } = useContext(UserContext);
  const { user } = useContext(AuthContext);
  const { getUserPostsByUserId } = useContext(PostContext);

  const fetchUser = async () => {
    if (id) {
      const user = await getUserById(id);
      console.log('user from userPage', user);
      setProfileUser(user);
      getUserPostsByUserId(user._id);
      //getUserProfile();
    }
  };
  useEffect(() => {
    fetchUser();

    user && getUserPostsByUserId(user?._id);
    //  }, [id, getUserById, setProfileUser]);
  }, []);

  // useEffect(() => {
  //   getPosts();
  // }, [getPosts]);

  return (
    <div className='profile-page flex flex-col items-center '>
      <ProfileHeader />
      <UserPosts />
    </div>
  );
};

export default UserPage;
