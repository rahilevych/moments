import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import UserPage from '../pages/UserPage';
import Home from '../pages/Home';
import { renderWithProviders } from './test-utils';
import Layout from '../components/Layout';
import SignIn from '../pages/SignIn';
import App from '../App';
import { getUserProfile } from '../services/authService';

jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn().mockReturnValue({
    user: {
      _id: '123',
      email: 'test@example.com',
      username: 'testuser',
      fullname: 'Test User',
      password: 'hashedpassword',
      user_img: 'https://example.com/avatar.jpg',
      bio: 'This is a test user.',
      following: [],
      followers: [],
      saved_posts: [],
      posts: [],
      createdAt: new Date(),
    },
    setUser: jest.fn(),
  }),
}));

jest.mock('../services/authService', () => ({
  getUserProfile: jest.fn().mockResolvedValue({
    _id: '123',
    email: 'test@example.com',
    username: 'testuser',
    fullname: 'Test User',
    password: 'hashedpassword',
    user_img: 'https://example.com/avatar.jpg',
    bio: 'This is a test user.',
    following: [],
    followers: [],
    saved_posts: [],
    posts: [],
    createdAt: new Date(),
  }),
}));

jest.mock('../services/userService', () => ({
  getUserById: jest.fn().mockResolvedValue({
    _id: '123',
    email: 'test@example.com',
    username: 'testuser',
    fullname: 'Test User',
    password: 'hashedpassword',
    user_img: 'https://example.com/avatar.jpg',
    bio: 'This is a test user.',
    following: [],
    followers: [],
    saved_posts: [],
    posts: [],
    createdAt: new Date(),
  }),
}));
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn((key) => (key === 'token' ? 'mocked_token' : null)),
  },
  writable: true,
});

test('renders SignUp on main page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <SignUp />
    </MemoryRouter>
  );
  expect(screen.getByTestId('sign-up')).toBeInTheDocument();
});

test('ProtectedRoutes renders Layout for authorized user', () => {
  renderWithProviders(<Layout />, { route: '/user/*' });
  expect(screen.getByTestId('layout')).toBeInTheDocument();
});

test('renders SignIn page', () => {
  renderWithProviders(<SignIn />, { route: '/login' });
  console.log(screen.debug());
  expect(screen.getByTestId('sign-in')).toBeInTheDocument();
});

test('renders UserPage', async () => {
  renderWithProviders(<UserPage />, { route: '/user/123' });

  await waitFor(() => {
    expect(screen.getByTestId('user page')).toBeInTheDocument();
  });
});

test('renders HomePage', () => {
  renderWithProviders(<Home />, { route: '/user/home' });

  expect(screen.getByTestId('home')).toBeInTheDocument();
});

test('renders SignUp for unknown routes', () => {
  render(
    <MemoryRouter initialEntries={['/unknown']}>
      <SignUp />
    </MemoryRouter>
  );
  expect(screen.getByTestId('sign-up')).toBeInTheDocument();
});

test('calls setUserProfile if token exists', async () => {
  renderWithProviders(<App />, { route: '/user/home' });

  await waitFor(() => expect(getUserProfile).toHaveBeenCalled());
});
