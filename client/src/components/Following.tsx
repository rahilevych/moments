import { useContext, useEffect, useState } from 'react';
import { Search } from './Search';
import UsersList from './UsersList';
import { PostContext } from '../context/PostContext';
import { UserContext } from '../context/UserContext';

const Following = () => {
  const { profileUser, users, setUsers } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const fetchUsers = async () => {
    try {
      profileUser && setUsers(profileUser?.following);
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
    <div className='p-4'>
      <Search
        setFilteredUsers={setFilteredUsers}
        setSearchQuery={setSearchQuery}
        title={'Search following'}
      />
      <UsersList filteredUsers={filteredUsers} />
    </div>
  );
};

export default Following;
