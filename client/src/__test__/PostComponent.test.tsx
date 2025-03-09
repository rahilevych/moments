import { screen, within } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth';
import { renderWithProviders } from './test-utils';
import PostComponent from '../components/PostComponent';
import { usePost } from '../hooks/usePost';
import userEvent from '@testing-library/user-event';

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

describe('PostComponent', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      socket: mockSocket,
    });
  });

  it('renders componnet correctly', () => {
    (usePost as jest.Mock).mockReturnValue({
      posts: [
        {
          _id: '123',
          user_id: { username: 'TestUser', user_img: 'test.jpg' },
          image_url: 'post.jpg',
          caption: 'Test Caption',
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
          likes: ['user123', 'user456'],
        },
      ],
    });
    renderWithProviders(<PostComponent postId='123' />);
    expect(screen.getByText('TestUser')).toBeInTheDocument();
    expect(screen.getByAltText('Profile')).toHaveAttribute('src', 'test.jpg');
    expect(screen.getByAltText('post')).toHaveAttribute('src', 'post.jpg');
    expect(screen.getByText('2 likes')).toBeInTheDocument();
    expect(screen.getByText('View all 2 comments')).toBeInTheDocument();
    expect(screen.getByTitle(/postform/i)).toBeInTheDocument();
    expect(screen.getByTitle(/posticonsnav/i)).toBeInTheDocument();
  });

  it('should open modal when clicking "View all comments"', async () => {
    const user = userEvent.setup();

    (usePost as jest.Mock).mockReturnValue({
      currentPost: {
        _id: 'post123',
        user_id: { username: 'TestUser', user_img: 'test.jpg', _id: '123' },
        image_url: 'post.jpg',
        caption: 'Test Caption',
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
      },
      posts: [
        {
          _id: 'post123',
          user_id: { username: 'TestUser', user_img: 'test.jpg', _id: '123' },
          image_url: 'post.jpg',
          caption: 'Test Caption',
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
        },
      ],

      setCurrentPost: jest.fn(),
    });

    renderWithProviders(<PostComponent postId='post123' />);
    const commentsLink = screen.getByTitle(/click/i);
    await user.click(commentsLink);
    expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
    const detailedpost = screen.getByTitle(/detailedpost/i);

    expect(within(detailedpost).getByAltText('User')).toHaveAttribute(
      'src',
      'test.jpg'
    );
    expect(within(detailedpost).getByText('TestUser')).toBeInTheDocument();
    expect(within(detailedpost).getByAltText(/post/i)).toHaveAttribute(
      'src',
      'post.jpg'
    );
    expect(within(detailedpost).getByText('2 likes')).toBeInTheDocument();
    expect(within(detailedpost).getByTitle(/postform/i)).toBeInTheDocument();
    expect(
      within(detailedpost).getByTitle(/posticonsnav/i)
    ).toBeInTheDocument();
  });
  it('should join and leave the socket room', () => {
    const { unmount } = renderWithProviders(<PostComponent postId='123' />);
    expect(mockSocket.emit).toHaveBeenCalledWith('join', '123');
    unmount();
    expect(mockSocket.emit).toHaveBeenCalledWith('leave', '123');
  });
});
