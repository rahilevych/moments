import { render, screen } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import Modal from '../components/Modal';
import userEvent from '@testing-library/user-event';

describe('Modal Component', () => {
  it('should render component when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
  });
  it('should not render component when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Hidden content</p>
      </Modal>
    );
    expect(screen.queryByText(/hidden content/i)).not.toBeInTheDocument();
  });
  it('should calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Close window test</p>
      </Modal>
    );
    const button = screen.getByLabelText(/close/i);
    await user.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
