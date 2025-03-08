import { screen } from '@testing-library/react';
import NavComponent from '../components/NavComponent';
import { renderWithProviders } from './test-utils';
import { useAuth } from '../hooks/useAuth';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('NavComponent', () => {
  let navigate: jest.Mock;
  beforeEach(() => {
    navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useAuth as jest.Mock).mockReturnValue({
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
    });
  });

  it('renders navigation items', () => {
    renderWithProviders(<NavComponent />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Create/i)).toBeInTheDocument();
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
  });

  it('opens search modal when clicking Search', async () => {
    renderWithProviders(<NavComponent />);

    const searchButton = screen.getByText(/Search/i);
    const user = userEvent.setup();
    await user.click(searchButton);
    expect(screen.getByTitle(/search page/i)).toBeInTheDocument();
  });

  it('opens add post modal when clicking Create', async () => {
    renderWithProviders(<NavComponent />);

    const createButton = screen.getByText(/Create/i);
    const user = userEvent.setup();
    await user.click(createButton);

    expect(screen.getByText(/Create new post/i)).toBeInTheDocument();
  });

  it('toggles mobile menu', async () => {
    renderWithProviders(<NavComponent />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    const user = userEvent.setup();
    await user.click(menuButton);
    expect(screen.getByText(/Home/i)).toBeVisible();
  });

  it('navigates to user profile when clicking profile', async () => {
    renderWithProviders(<NavComponent />);
    const profileButton = screen.getByText(/testuser/i);
    const user = userEvent.setup();

    await user.click(profileButton);

    expect(navigate).toHaveBeenCalledWith('/user/123');
  });
});
