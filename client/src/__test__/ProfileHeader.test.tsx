import { screen, within } from '@testing-library/react';

import { useAuth } from '../hooks/useAuth';
import { logout } from '../services/authService';
import { toggleSubscribe } from '../services/userService';

import { renderWithProviders } from './test-utils';
import ProfileHeader from '../components/ProfileHeader';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

jest.mock('../hooks/useAuth');
jest.mock('../services/authService');
jest.mock('../services/userService');
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useNavigate: jest.fn(),
}));

describe('ProfileHeader', () => {
  const mockSetUser = jest.fn();
  const mockNavigate = jest.fn();

  const profileUser = {
    _id: 'profileUser123',
    email: 'secondtest@example.com',
    username: 'ProfileUser',
    fullname: 'ProfileUser',
    password: 'hashedpassword',
    user_img: 'https://example.com/avatar.jpg',
    bio: 'This is test ProfileUser.',
    following: [
      {
        _id: 'user789',
        email: 'secondtest@example.com',
        username: 'user789',
        fullname: 'user789',
        password: 'hashedpassword',
        user_img: 'https://example.com/avatar.jpg',
        bio: 'This is test user789.',
        following: [],
        followers: [],
        saved_posts: [],
        posts: [],
        createdAt: new Date(),
      },
    ],
    followers: [
      {
        _id: 'user789',
        email: 'secondtest@example.com',
        username: 'user789',
        fullname: 'user789',
        password: 'hashedpassword',
        user_img: 'https://example.com/avatar.jpg',
        bio: 'This is test user789.',
        following: [],
        followers: [],
        saved_posts: [],
        posts: [],
        createdAt: new Date(),
      },
    ],
    saved_posts: [],
    posts: [],
    createdAt: new Date(),
  };
  const user = userEvent.setup();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        _id: 'profileUser123',
        email: 'secondtest@example.com',
        username: 'ProfileUser',
        fullname: 'ProfileUser',
        password: 'hashedpassword',
        user_img: 'https://example.com/avatar.jpg',
        bio: 'This is test ProfileUser.',
        following: [
          {
            _id: 'user789',
            email: 'secondtest@example.com',
            username: 'user789',
            fullname: 'user789',
            password: 'hashedpassword',
            user_img: 'https://example.com/avatar.jpg',
            bio: 'This is test user789.',
            following: [],
            followers: [],
            saved_posts: [],
            posts: [],
            createdAt: new Date(),
          },
        ],
        followers: [
          {
            _id: 'user789',
            email: 'secondtest@example.com',
            username: 'user789',
            fullname: 'user789',
            password: 'hashedpassword',
            user_img: 'https://example.com/avatar.jpg',
            bio: 'This is test user789.',
            following: [],
            followers: [],
            saved_posts: [],
            posts: [],
            createdAt: new Date(),
          },
        ],
        saved_posts: [],
        posts: [],
        createdAt: new Date(),
      },
      setUser: mockSetUser,
    });
    (logout as jest.Mock).mockResolvedValue(null);
    (toggleSubscribe as jest.Mock).mockResolvedValue({ success: true });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders profile header correctly', () => {
    renderWithProviders(<ProfileHeader profileUser={profileUser} />);

    expect(screen.getByText('ProfileUser')).toBeInTheDocument();

    expect(
      screen.getByText((_, element) => element?.textContent === '1 followers')
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === '1 following')
    ).toBeInTheDocument();
  });

  it('opens followers modal on click with followers list', async () => {
    renderWithProviders(<ProfileHeader profileUser={profileUser} />);
    const followersButton = screen.getByText(
      (_, element) => element?.textContent === '1 followers'
    );
    await user.click(followersButton);

    const input = screen.getByPlaceholderText(/Search users.../i);
    expect(input).toBeInTheDocument();

    const connectionsList = screen.getByTitle(/connectionsList/i);

    expect(connectionsList).toBeInTheDocument();

    const rows = within(connectionsList).getAllByRole('row');
    expect(rows).toHaveLength(1);

    for (let follower of profileUser.followers) {
      const username = screen.getByText(follower.username);
      const buttons = within(connectionsList).getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(username).toBeInTheDocument;
    }
  });

  it('opens following modal on click with following list', async () => {
    renderWithProviders(<ProfileHeader profileUser={profileUser} />);
    const followingButton = screen.getByText(
      (_, element) => element?.textContent === '1 following'
    );
    await user.click(followingButton);

    const input = screen.getByPlaceholderText(/Search users.../i);
    expect(input).toBeInTheDocument();

    const connectionsList = screen.getByTitle(/connectionsList/i);

    expect(connectionsList).toBeInTheDocument();

    const rows = within(connectionsList).getAllByRole('row');
    expect(rows).toHaveLength(1);

    for (let following of profileUser.following) {
      const username = screen.getByText(following.username);
      const buttons = within(connectionsList).getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(username).toBeInTheDocument;
    }
  });

  it('logs out user correctly', async () => {
    renderWithProviders(<ProfileHeader profileUser={profileUser} />);
    const logoutButton = screen.getByText(/Log out/i);
    await user.click(logoutButton);
    expect(logout).toHaveBeenCalledWith(mockSetUser, mockNavigate);
  });
});
