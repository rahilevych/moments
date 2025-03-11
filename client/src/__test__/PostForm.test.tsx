import { screen } from '@testing-library/react';
import PostForm from '../components/PostForm';
import { useAuth } from '../hooks/useAuth';
import { usePost } from '../hooks/usePost';
import { renderWithProviders } from './test-utils';
import userEvent from '@testing-library/user-event';

jest.mock('../hooks/useAuth');
jest.mock('../hooks/usePost');

describe('PostForm', () => {
  const mockSetCurrentPost = jest.fn();

  const mockUser = {
    _id: 'user123',
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
  };
  const mockPost = {
    _id: 'post123',
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
    image_url: 'post.jpg',
    caption: 'Test Caption',
    createdAt: new Date(),
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
    ],
    likes: ['user123', 'user456'],
  };
  const mockSocket = {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      socket: mockSocket,
    });

    (usePost as jest.Mock).mockReturnValue({
      setCurrentPost: mockSetCurrentPost,
    });
  });

  it('renders form', () => {
    renderWithProviders(<PostForm post={mockPost} />);
    expect(screen.getByPlaceholderText('Add a comment...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
  });

  it('changes the input value when typing', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PostForm post={mockPost} />);
    const input = screen.getByPlaceholderText(
      'Add a comment...'
    ) as HTMLInputElement;

    await user.type(input, 'Test comment');
    expect(input.value).toBe('Test comment');
  });

  it('calls setCurrentPost and socket.emit when submitting the form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PostForm post={mockPost} />);
    const input = screen.getByPlaceholderText('Add a comment...');
    const button = screen.getByRole('button');

    await user.type(input, 'Nice post!');
    await user.click(button);

    expect(mockSetCurrentPost).toHaveBeenCalledWith(mockPost);
    expect(mockSocket.emit).toHaveBeenCalledWith('add_comment', {
      text: 'Nice post!',
      user_id: 'user123',
      post_id: 'post123',
    });
  });
  it('does not call socket.emit if the comment is empty', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PostForm post={mockPost} />);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(mockSocket.emit).not.toHaveBeenCalled();
  });
  it('clears the input field after submitting a comment', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PostForm post={mockPost} />);
    const input = screen.getByPlaceholderText(
      'Add a comment...'
    ) as HTMLInputElement;
    const button = screen.getByRole('button');

    await user.type(input, 'Hello!');
    await user.click(button);

    expect(input.value).toBe('');
  });
  it('handles missing user or post without errors', async () => {
    const user = userEvent.setup();
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      socket: mockSocket,
    });
    renderWithProviders(<PostForm post={mockPost} />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockSocket.emit).not.toHaveBeenCalled();
  });
});
