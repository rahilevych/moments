import { useEffect, useState } from 'react';
import UsersList from './UsersList';
import { Search } from './Search';
import { UserType } from '../types/UserType';
interface Props {
  profileUser: UserType;
  onClose: () => void;
  modalType: string;
}
const ConnectionsList: React.FC<Props> = ({
  onClose,
  profileUser,
  modalType,
}) => {
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const fetchUsers = async (field: string, profileUser: UserType) => {
    try {
      if (profileUser) {
        const usersList = profileUser[field as keyof UserType];
        if (Array.isArray(usersList)) {
          setUsers(usersList as UserType[]);
        } else {
          console.error(`Expected an array but got:`, usersList);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsers(modalType, profileUser);
    console.log('users>>>>');
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div
      title='connectionsList'
      className='p-4 max-h-[calc(100vh-150px)] overflow-y-auto'>
      {users && (
        <Search
          setFilteredUsers={setFilteredUsers}
          setSearchQuery={setSearchQuery}
          title={'Search followers'}
          users={users}
        />
      )}
      <UsersList filteredUsers={filteredUsers} onClose={onClose} />
    </div>
  );
};
export default ConnectionsList;
