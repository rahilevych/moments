import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommentType } from '../types/CommentType';
import { useAuth } from '../hooks/useAuth';
import { Comment } from '../components/Comment';

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
  }),
}));

const mockSocket = {
  emit: jest.fn(),
};

const mockUser = {
  _id: 'user123',
  username: 'TestUser',
};

const mockComment: CommentType = {
  _id: 'comment123',
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
  text: 'Test comment',
  post_id: 'post123',
  createdAt: new Date(),
  likes: ['user789'],
};

describe('Comment Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      socket: mockSocket,
    });
  });

  it('should render comment text, username and avatar', () => {
    render(<Comment comment={mockComment} />);

    expect(screen.getByText(/Test comment/i)).toBeInTheDocument();
    expect(screen.getByText(/secondUser/i)).toBeInTheDocument();
    expect(screen.getByAltText(/avatar/i)).toBeInTheDocument();
  });

  it('should render like button with correct state', async () => {
    render(<Comment comment={mockComment} />);

    const heartIcon = screen.getByRole('button');
    expect(heartIcon).toBeInTheDocument();
  });

  it('should call like event when clicking like button', async () => {
    render(<Comment comment={mockComment} />);

    const user = userEvent.setup();
    const likeBtn = screen.getByRole('button');

    await user.click(likeBtn);
    expect(mockSocket.emit).toHaveBeenCalledWith(
      'like_comment',
      mockComment._id
    );
  });
  it('should show delete button if user is the author of comment', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { _id: '456' },
      socket: mockSocket,
    });

    render(<Comment comment={mockComment} />);
    const user = userEvent.setup();

    const deleteButton = screen.getByText(/Delete/i);
    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);
    expect(mockSocket.emit).toHaveBeenCalledWith(
      'delete_comment',
      mockComment._id,
      mockComment.post_id
    );
  });

  test('shouldn`t show delete button if user isn`t the author', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { _id: '789' },
      socket: mockSocket,
    });
    render(<Comment comment={mockComment} />);

    expect(screen.queryByText(/Delete/i)).not.toBeInTheDocument();
  });
});
