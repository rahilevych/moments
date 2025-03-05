import { render, screen } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth';
import AddPost from '../components/AddPost';
import userEvent from '@testing-library/user-event';
import { addPost } from '../services/postServices';
//import { UserEvent } from '@testing-library/user-event'

jest.mock('../services/postServices', () => ({
  addPost: jest.fn(),
}));
jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('AddPost Component', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        _id: '123',
        username: 'testuser',
        password: 'hashedpassword',
      },
    });
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  });

  it('should correct render component with button for upload photo', () => {
    render(<AddPost />);
    expect(
      screen.getByRole('button', { name: /upload photo/i })
    ).toBeInTheDocument();
  });
  it('after clicking "Upload Photo" opens file input and selecting an image shows preview', async () => {
    render(<AddPost />);
    const user = userEvent.setup();
    const uploadButton = screen.getByRole('button', { name: /upload photo/i });
    const fileInput = screen.getByLabelText(/drag photos here/i);
    await user.click(uploadButton);
    const file = new File(['test-image'], 'test.jpg', { type: 'image/jpeg' });
    await user.upload(fileInput, file);
    expect(await screen.findByAltText(/Preview/i)).toBeInTheDocument();
  });
  it('button should move user back to upload page', async () => {
    render(<AddPost />);
    const user = userEvent.setup();
    const file = new File(['test-image'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/drag photos here/i);
    await user.upload(fileInput, file);
    expect(await screen.findByAltText('Preview')).toBeInTheDocument();
    await user.click(screen.getByLabelText(/back/i));
    expect(screen.getByText(/upload photo/i)).toBeInTheDocument();
  });

  it('should update input by writing caption', async () => {
    render(<AddPost />);
    const user = userEvent.setup();

    const file = new File(['test-image'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/drag photos here/i);

    await user.upload(fileInput, file);
    expect(await screen.findByAltText('Preview')).toBeInTheDocument();

    const captionInput = screen.getByLabelText(/caption/i);
    await user.type(captionInput, 'text');
    expect(captionInput).toHaveValue('text');
  });

  it('by click btn add post should call addPost function form and update state', async () => {
    render(<AddPost />);

    const user = userEvent.setup();
    const fileInput = screen.getByLabelText(/drag photos here/i);
    const file = new File(['test-image'], 'test.jpg', { type: 'image/jpeg' });
    user.upload(fileInput, file);
    await user.upload(fileInput, file);
    expect(await screen.findByAltText('Preview')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /add post/i }));
    expect(addPost).toHaveBeenCalledTimes(1);
    expect(addPost).toHaveBeenCalledWith(expect.any(FormData));
    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /upload photo/i })
    ).toBeInTheDocument();
  });
});
