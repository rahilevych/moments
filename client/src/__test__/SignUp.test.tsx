import SignUp from '../pages/SignUp';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { signUp } from '../services/authService';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../services/authService', () => ({
  signUp: jest.fn(),
}));

function initInputs() {
  return {
    emailInput: screen.getByLabelText(/email/i),
    usernameInput: screen.getByLabelText(/username/i),
    fullnameInput: screen.getByLabelText(/full name/i),
    passwordInput: screen.getByLabelText(/password/i),
    button: screen.getByRole('button', { name: /sign up/i }),
    user: userEvent.setup(),
  };
}

describe('SignUp Component', () => {
  it('should render form with 4 inputs and button', () => {
    render(<SignUp />, { wrapper: MemoryRouter });
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /sign up for a new account/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should allow user to sign up and navigate to sign in', async () => {
    (signUp as jest.Mock).mockResolvedValue({ success: true });

    render(<SignUp />, { wrapper: MemoryRouter });
    const {
      emailInput,
      usernameInput,
      fullnameInput,
      passwordInput,
      button,
      user,
    } = initInputs();

    await user.type(emailInput, 'test@test.com');
    await user.type(usernameInput, 'testusername');
    await user.type(fullnameInput, 'test full name');
    await user.type(passwordInput, 'password');
    await user.click(button);

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith(
        'test@test.com',
        'testusername',
        'password',
        'test full name'
      );
    });
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', {
        replace: true,
      });
    });
  });

  it('should show validation error if email is invalid', async () => {
    render(<SignUp />, { wrapper: MemoryRouter });
    const { emailInput, user } = initInputs();
    await user.type(emailInput, 'invalid-email');
    await user.tab();
    expect(
      await screen.findByText(/invalid email format/i)
    ).toBeInTheDocument();
  });

  it('should show validation error if username is invalid', async () => {
    render(<SignUp />, { wrapper: MemoryRouter });
    const { usernameInput, user } = initInputs();
    user.type(usernameInput, 'd');
    user.tab();
    expect(
      await screen.findByText(/Username must be 3-20 characters/i)
    ).toBeInTheDocument();
  });
  it('should show validation error if full name is invalid', async () => {
    render(<SignUp />, { wrapper: MemoryRouter });
    const { fullnameInput, user } = initInputs();
    user.type(fullnameInput, ' ');
    user.tab();
    expect(
      await screen.findByText(/Full name must be at least 4 characters/i)
    ).toBeInTheDocument();
  });

  it('should show validation error if password is invalid', async () => {
    render(<SignUp />, { wrapper: MemoryRouter });
    const { passwordInput, user } = initInputs();

    user.type(passwordInput, '123');
    user.tab();

    expect(
      await screen.findByText(/Password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  it('should show error if user with such username already exist', async () => {
    (signUp as jest.Mock).mockResolvedValueOnce({
      success: false,
      field: 'username',
      message: 'User with this username already exists',
    });
    render(<SignUp />, { wrapper: MemoryRouter });
    const {
      emailInput,
      usernameInput,
      fullnameInput,
      passwordInput,
      button,
      user,
    } = initInputs();

    await user.type(emailInput, 'test@test.com');
    await user.type(usernameInput, 'testusername');
    await user.type(fullnameInput, 'Test User');
    await user.type(passwordInput, 'password');

    await user.click(button);

    expect(
      await screen.findByText(/User with this username already exists/i)
    ).toBeInTheDocument();
  });
  it('should show error if user with such email already exist', async () => {
    (signUp as jest.Mock).mockResolvedValue({
      success: false,
      field: 'email',
      message: 'User with this email already exists',
    });

    render(<SignUp />, { wrapper: MemoryRouter });
    const {
      emailInput,
      usernameInput,
      fullnameInput,
      passwordInput,
      button,
      user,
    } = initInputs();

    await user.type(emailInput, 'test@test.com');
    await user.type(usernameInput, 'testusername');
    await user.type(fullnameInput, 'Test User');
    await user.type(passwordInput, 'password');

    await user.click(button);

    expect(
      await screen.findByText(/User with this email already exists/i)
    ).toBeInTheDocument();
  });
});
