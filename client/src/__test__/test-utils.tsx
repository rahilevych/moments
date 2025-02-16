import { render } from '@testing-library/react';
import { PostContextProvider } from '../context/PostContext';
import { MemoryRouter } from 'react-router-dom';
import { UserContextProvider } from '../context/UserContext';
import { CommentContextProvider } from '../context/CommentContext';

export const renderWithProviders = (
  ui: React.ReactElement,
  { route = '/' } = {}
) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <UserContextProvider>
        <PostContextProvider>
          <CommentContextProvider>{ui}</CommentContextProvider>
        </PostContextProvider>
      </UserContextProvider>
    </MemoryRouter>
  );
};
