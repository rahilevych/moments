import { render } from '@testing-library/react';
import { PostContextProvider } from '../context/PostContext';
import { MemoryRouter } from 'react-router-dom';
import { AuthContextProvider } from '../context/AuthContext';

export const renderWithProviders = (
  ui: React.ReactElement,
  { route = '/' } = {}
) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthContextProvider>
        <PostContextProvider>{ui}</PostContextProvider>
      </AuthContextProvider>
    </MemoryRouter>
  );
};
