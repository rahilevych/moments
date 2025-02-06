import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/userService';
import { Search } from './Search';
import UsersList from './UsersList';
import { useUser } from '../hooks/useUser';

const SearchPage = ({ onClose }: { onClose: () => void }) => {
  const { users, setUsers, user } = useUser();
  const [, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const fetchUsers = async () => {
    try {
      setUsers(await getAllUsers());
    } catch (error) {}
  };

  useEffect(() => {
    console.log('user search page>>>', user);
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div className='p-4 max-h-[calc(100vh-150px)] overflow-y-auto'>
      <Search
        setFilteredUsers={setFilteredUsers}
        setSearchQuery={setSearchQuery}
        title={'Search Users'}
      />
      <UsersList filteredUsers={filteredUsers} onClose={onClose} />
    </div>
  );
};

export default SearchPage;
