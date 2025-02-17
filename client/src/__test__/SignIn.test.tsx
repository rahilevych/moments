import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import SignIn from '../pages/SignIn';
import { getUserProfile, signIn } from '../services/authService';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../hooks/useUser', () => ({
  useUser: jest.fn(),
}));

jest.mock('../services/authService', () => ({
  getUserProfile: jest.fn(),
  signIn: jest.fn(),
}));

describe('SignIn Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      fetchUser: jest.fn(),
    });
  });

  it('should render form and header', () => {
    render(<SignIn />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /sign in to your account/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot password?/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it('should submit the form and call signIn with the right credentials', async () => {
    const user = userEvent.setup();
    const fetchUserMock = jest.fn();

    (useUser as jest.Mock).mockReturnValue({
      user: null,
      fetchUser: fetchUserMock,
    });

    (signIn as jest.Mock).mockResolvedValue({});

    (getUserProfile as jest.Mock).mockResolvedValue({
      _id: '123',
      email: 'test@example.com',
      username: 'testuser',
      fullname: 'Test User',
      password: 'password123',
      user_img: 'https://example.com/avatar.jpg',
      bio: 'This is a test user.',
      following: [],
      followers: [],
      saved_posts: [],
      posts: [],
      createdAt: new Date(),
    });

    render(<SignIn />, { wrapper: MemoryRouter });

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /sign in/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(button);

    expect(signIn).toHaveBeenCalledWith('testuser', 'password123');

    await waitFor(() => {
      expect(getUserProfile).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(fetchUserMock).toHaveBeenCalledWith('123');
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/user/home', {
        replace: true,
      });
    });
  });
});
