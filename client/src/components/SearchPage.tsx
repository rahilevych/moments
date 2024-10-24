import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { getAllUsers } from '../services/userService';
import { Search } from './Search';
import UsersList from './UsersList';

const SearchPage = () => {
  const { users, setUsers, user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
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
    <div className='p-4'>
      <Search
        setFilteredUsers={setFilteredUsers}
        setSearchQuery={setSearchQuery}
        title={'Search Users'}
      />
      <UsersList filteredUsers={filteredUsers} />
    </div>
  );
};

export default SearchPage;
