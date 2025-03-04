import { screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { renderWithProviders } from './test-utils';
import SignIn from '../pages/SignIn';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

jest.mock('../hooks/useAuth');

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('redirects to /login if user and token are missing', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    renderWithProviders(
      <Routes>
        <Route
          path='/protected'
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<SignIn />} />
      </Routes>,
      { route: '/login' }
    );

    await waitFor(() => {
      expect(screen.getByTestId('sign-in')).toBeInTheDocument();
    });
  });

  it('renders children if user is authenticated', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: '123', name: 'Test User' },
    });
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    renderWithProviders(
      <Routes>
        <Route
          path='/protected'
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        />
      </Routes>,
      { route: '/protected' }
    );

    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });
  });

  it('renders children if token is present in localStorage', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-token');

    renderWithProviders(
      <Routes>
        <Route
          path='/protected'
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        />
      </Routes>,
      { route: '/protected' }
    );

    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });
  });
});
