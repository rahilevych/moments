import { useEffect, useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import UserPosts from '../components/UserPosts';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/userService';
import { usePost } from '../hooks/usePost';
import { UserType } from '../types/UserType';

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const [profileUser, setProfileUser] = useState<UserType | null>(null);
  const { fetchPosts } = usePost();

  const init = async () => {
    if (!id) return;

    const result = await getUserById(id);
    if (result.success) {
      setProfileUser(result.data);
    } else {
      console.error('Failed to fetch user:', result.error);
    }

    fetchPosts(id);
  };
  const handleProfileUserChange = (profileUser: UserType) => {
    setProfileUser(profileUser);
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    profileUser && (
      <div
        data-testid='user page'
        className='profile-page flex flex-col items-center px-4 sm:px-8 py-4 sm:py-8'>
        <ProfileHeader
          profileUser={profileUser}
          onProfileUserChange={handleProfileUserChange}
        />
        <div className='w-full max-w-4xl'>
          {<UserPosts profileUser={profileUser} />}
        </div>
      </div>
    )
  );
};

export default UserPage;
