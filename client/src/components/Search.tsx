import { UserType } from '../types/UserType';

type Props = {
  setFilteredUsers: (users: UserType[]) => void;
  setSearchQuery: (query: string) => void;
  title: string;
  users: UserType[];
};
export const Search: React.FC<Props> = ({
  setFilteredUsers,
  setSearchQuery,
  title,
  users,
}) => {
  const handleSearch = (query: string) => {
    if (!users) {
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const results = users.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerCaseQuery) ||
        user.fullname.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(results);
  };
  return (
    <div>
      {' '}
      <h1 className='text-2xl font-bold mb-4'>{title}</h1>
      <form className='mb-4 flex space-x-2'>
        <input
          type='text'
          placeholder='Search users...'
          className='p-2 border border-gray-300 rounded-md flex-grow'
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </form>
    </div>
  );
};
