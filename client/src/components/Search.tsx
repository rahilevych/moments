import { UserType } from '../types/UserType';
import { useUser } from '../hooks/useUser';
type Props = {
  setFilteredUsers: (users: UserType[]) => void;
  setSearchQuery: (query: string) => void;
  title: string;
};
export const Search = (props: Props) => {
  const { users } = useUser();

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
    props.setFilteredUsers(results);
  };
  return (
    <div>
      {' '}
      <h1 className='text-2xl font-bold mb-4'>{props.title}</h1>
      <form className='mb-4 flex space-x-2'>
        <input
          type='text'
          placeholder='Search users...'
          className='p-2 border border-gray-300 rounded-md flex-grow'
          onChange={(e) => {
            props.setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </form>
    </div>
  );
};
