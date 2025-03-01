import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/userService';
import { Search } from './Search';
import UsersList from './UsersList';
import { useAuth } from '../hooks/useAuth';
import { UserType } from '../types/UserType';

const SearchPage = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        console.error('Failed to fetch users:', response.error);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
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
      {users && (
        <Search
          users={users}
          setFilteredUsers={setFilteredUsers}
          setSearchQuery={setSearchQuery}
          title={'Search Users'}
        />
      )}
      <UsersList filteredUsers={filteredUsers} onClose={onClose} />
    </div>
  );
};

export default SearchPage;
