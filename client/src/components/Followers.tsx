import { useEffect, useState } from 'react';
import UsersList from './UsersList';
import { Search } from './Search';

import { useUser } from '../hooks/useUser';

const Followers = ({ onClose }: { onClose: () => void }) => {
  const { users, fetchUsers } = useUser();
  const [, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

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
