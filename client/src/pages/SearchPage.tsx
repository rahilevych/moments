import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { fetchData, getAllUsers } from '../services/userService';
import { PostContext } from '../context/PostContext';
import { Search } from '../components/Search';
import UsersList from '../components/UsersList';

const SearchPage = () => {
  const { users, setUsers, setUser } = useContext(UserContext);
  const { setPosts } = useContext(PostContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const fetchUsers = async () => {
    try {
      await fetchData(setUser, setPosts);
      await getAllUsers(setUsers);
    } catch (error) {}
  };

  useEffect(() => {
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
