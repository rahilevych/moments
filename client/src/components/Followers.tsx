import { useContext, useEffect, useState } from 'react';
import UsersList from './UsersList';
import { Search } from './Search';
import { UserContext } from '../context/UserContext';

const Followers = ({ onClose }: { onClose: () => void }) => {
  const { profileUser, users, setUsers } = useContext(UserContext);
  const [, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const fetchUsers = async () => {
    try {
      profileUser && setUsers(profileUser.followers);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUsers();
    console.log('users>>>>');
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div className='p-4 max-h-[calc(100vh-150px)] overflow-y-auto'>
      <Search
        setFilteredUsers={setFilteredUsers}
        setSearchQuery={setSearchQuery}
        title={'Search followers'}
      />
      <UsersList filteredUsers={filteredUsers} onClose={onClose} />
    </div>
  );
};
export default Followers;
