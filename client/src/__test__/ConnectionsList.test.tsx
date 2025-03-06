import { screen } from '@testing-library/react';
import { UserType } from '../types/UserType';
import ConnectionsList from '../components/ConnectionsList';
import { renderWithProviders } from './test-utils';

describe('ConnectionsList Component', () => {
  const mockOnClose = jest.fn();
  const mockProfileUser: UserType = {
    _id: 'user123',
    username: 'testuser',
    email: 'test@example.com',
    fullname: 'Test User',
    password: 'hashedpassword',
    user_img: 'https://example.com/avatar.jpg',
    bio: 'This is a test user.',
    following: [
      {
        _id: 'user456',
        username: 'followedUser',
        email: 'followedUser@example.com',
        fullname: 'FollowedUser',
        password: 'hashedpassword',
        user_img: 'https://example.com/avatar.jpg',
        bio: 'FollowedUser',
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
        username: 'followerUser',
        email: 'followerUser@example.com',
        fullname: 'FollowerUser',
        password: 'hashedpassword',
        user_img: 'https://example.com/avatar.jpg',
        bio: 'FollowerUser',
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

  it('should render ConnectionsList with Search and Following list', () => {
    renderWithProviders(
      <ConnectionsList
        onClose={mockOnClose}
        profileUser={mockProfileUser}
        modalType='following'
      />
    );
    const buttons = screen.getAllByRole('button');
    const input = screen.getByPlaceholderText(/Search users.../i);
    expect(buttons).toHaveLength(2);
    expect(input).toBeInTheDocument();
    expect(screen.getByText(/followedUser/i)).toBeInTheDocument();
  });
  it('should render ConnectionsList with Search and Followers list', () => {
    renderWithProviders(
      <ConnectionsList
        onClose={mockOnClose}
        profileUser={mockProfileUser}
        modalType='followers'
      />
    );
    const buttons = screen.getAllByRole('button');
    const input = screen.getByPlaceholderText(/Search users.../i);
    expect(buttons).toHaveLength(2);
    expect(input).toBeInTheDocument();
    expect(screen.getByText(/followerUser/i)).toBeInTheDocument();
  });
});
