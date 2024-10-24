import { useContext, useEffect, useState } from 'react';
import UsersList from './UsersList';
import { Search } from './Search';

import { UserContext } from '../context/UserContext';
import { PostContext } from '../context/PostContext';

const Followers = () => {
  const { profileUser, users, setUsers } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
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
    <div className='p-4'>
      <Search
        setFilteredUsers={setFilteredUsers}
        setSearchQuery={setSearchQuery}
        title={'Search followers'}
      />
      <UsersList filteredUsers={filteredUsers} />
    </div>
  );
};
export default Followers;
