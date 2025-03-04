import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SignIn from '../pages/SignIn';
import { getUserProfile, signIn } from '../services/authService';
import { useUserApi } from '../hooks/useUserApi';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('../hooks/useUserApi', () => ({
  useUserApi: jest.fn(),
}));

jest.mock('../services/authService', () => ({
  getUserProfile: jest.fn(),
  signIn: jest.fn(),
}));

function initInputs() {
  return {
    usernameInput: screen.getByLabelText(/username/i),
    passwordInput: screen.getByLabelText(/password/i),
    button: screen.getByRole('button', { name: /sign in/i }),
    user: userEvent.setup(),
  };
}

describe('SignIn Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      setUser: jest.fn(),
      setToken: jest.fn(),
    });
    (useUserApi as jest.Mock).mockReturnValue({
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

  it('should allow a user to sign in and navigate to home', async () => {
    (signIn as jest.Mock).mockResolvedValue({
      success: true,
      data: 'mockToken',
      error: null,
    });

    (getUserProfile as jest.Mock).mockResolvedValue({
      success: true,
      data: { _id: '123', username: 'testuser', password: 'password123' },
    });
    console.log('getUserProfile called');
    render(<SignIn />, { wrapper: MemoryRouter });

    const { usernameInput, passwordInput, button, user } = initInputs();

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(button);

    expect(signIn).toHaveBeenCalledWith('testuser', 'password123');

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/user/home', {
        replace: true,
      });
    });
  });

  it('should show an error message when sign in fails', async () => {
    (signIn as jest.Mock).mockRejectedValue(new Error('Incorrect password'));

    render(<SignIn />, { wrapper: MemoryRouter });

    const { usernameInput, passwordInput, button, user } = initInputs();

    await user.type(usernameInput, 'wronguser');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Incorrect password/i)).toBeInTheDocument();
    });
  });

  it('should show validation error if username is invalid', async () => {
    render(<SignIn />, { wrapper: MemoryRouter });
    const { usernameInput, user } = initInputs();
    user.type(usernameInput, 'd');
    user.tab();
    expect(
      await screen.findByText(/Username must be 3-20 characters/i)
    ).toBeInTheDocument();
  });
  it('should show validation error if password is invalid', async () => {
    render(<SignIn />, { wrapper: MemoryRouter });
    const { passwordInput, user } = initInputs();

    user.type(passwordInput, '123');
    user.tab();

    expect(
      await screen.findByText(/Password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });
});
