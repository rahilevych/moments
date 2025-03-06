import { screen } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth';
import { usePost } from '../hooks/usePost';
import DetailedPost from '../components/DetailedPost';
import { renderWithProviders } from './test-utils';

jest.mock('../hooks/usePost', () => ({
  usePost: jest.fn(),
}));

jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

const mockSocket = {
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
};

describe('DetailedPost component', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      socket: mockSocket,
    });
  });

  it('shows "Loading..." if currentPost is null', () => {
    (usePost as jest.Mock).mockReturnValue({ currentPost: null });
    renderWithProviders(<DetailedPost />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders post correctly', () => {
    const post = {
      _id: 'post123',
      user_id: { user_img: 'profile.jpg', username: 'user1' },
      image_url: 'image.jpg',
      caption: 'Post caption',
      comments: [],
    };
    (usePost as jest.Mock).mockReturnValue({ currentPost: post });
    renderWithProviders(<DetailedPost />);
    expect(screen.getByText(post.user_id.username)).toBeInTheDocument();
    expect(screen.getByAltText('User')).toHaveAttribute(
      'src',
      post.user_id.user_img
    );
    expect(screen.getByAltText('Post')).toHaveAttribute('src', post.image_url);
    expect(screen.getByText(post.caption)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /comments/i,
      })
    );
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(
      screen.getByPlaceholderText(/Add a comment.../i)
    ).toBeInTheDocument();
  });

  it('showscomments if they are existing', () => {
    const post = {
      _id: 'post123',
      user_id: { _id: 'user123', user_img: 'profile.jpg', username: 'user1' },
      image_url: 'image.jpg',
      caption: 'Post caption',
      comments: [
        {
          _id: '1',
          text: 'comment1',
          post_id: 'post123',
          user_id: {
            _id: '456',
            email: 'secondtest@example.com',
            username: 'secondUser',
            fullname: 'Second User',
            password: 'hashedpassword',
            user_img: 'https://example.com/avatar.jpg',
            bio: 'This is second test user.',
            following: [],
            followers: [],
            saved_posts: [],
            posts: [],
            createdAt: new Date(),
          },
          createdAt: new Date(),
          likes: ['user789'],
        },
        {
          _id: '2',
          user_id: {
            _id: '456',
            email: 'secondtest@example.com',
            username: 'secondUser',
            fullname: 'Second User',
            password: 'hashedpassword',
            user_img: 'https://example.com/avatar.jpg',
            bio: 'This is second test user.',
            following: [],
            followers: [],
            saved_posts: [],
            posts: [],
            createdAt: new Date(),
          },
          text: 'comment2',
          post_id: 'post123',
          createdAt: new Date(),
          likes: ['user789'],
        },
      ],
    };

    (usePost as jest.Mock).mockReturnValue({ currentPost: post });
    renderWithProviders(<DetailedPost />);

    expect(screen.getByText(/comment1/i)).toBeInTheDocument();
    expect(screen.getByText(/comment2/i)).toBeInTheDocument();
  });

  test('shows "No comments yet. Be the first to comment!" if there are no comments', () => {
    const post = {
      _id: 'post123',
      user_id: { _id: 'user123', user_img: 'profile.jpg', username: 'user1' },
      image_url: 'image.jpg',
      caption: 'Post caption',
      comments: [],
    };

    (usePost as jest.Mock).mockReturnValue({ currentPost: post });

    renderWithProviders(<DetailedPost />);

    expect(
      screen.getByText(/No comments yet. Be the first to comment!/i)
    ).toBeInTheDocument();
  });

  test('should call socket.emit with `join` on mount and `leave` on unmount', () => {
    const post = {
      _id: 'post123',
      user_id: { _id: 'user123', user_img: 'profile.jpg', username: 'user1' },
      image_url: 'image.jpg',
      caption: 'Post caption',
      comments: [],
    };

    (useAuth as jest.Mock).mockReturnValue({ socket: { emit: mockSocket } });
    (useAuth as jest.Mock).mockReturnValue({ currentPost: post });

    const { unmount } = renderWithProviders(<DetailedPost />);
    expect(mockSocket.emit).toHaveBeenCalledWith('join', 'post123');
    unmount();
    expect(mockSocket.emit).toHaveBeenCalledWith('leave', 'post123');
  });
});
