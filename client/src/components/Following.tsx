import { useEffect, useState } from 'react';
import { Search } from './Search';
import UsersList from './UsersList';
import { useUser } from '../hooks/useUser';

const Following = ({ onClose }: { onClose: () => void }) => {
  const { fetchUsers, users } = useUser();
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
        title={'Search following'}
      />
      <UsersList filteredUsers={filteredUsers} onClose={onClose} />
    </div>
  );
};

export default Following;
