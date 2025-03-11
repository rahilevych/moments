import { screen } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import Layout from '../components/Layout';
jest.mock('../components/NavComponent', () => () => (
  <div>NavComponent Mocked</div>
));

describe('Layout component', () => {
  it('renders Layout with NavComponent and Outlet', () => {
    renderWithProviders(<Layout />);

    expect(screen.getByText(/NavComponent Mocked/i)).toBeInTheDocument();

    expect(screen.getByTestId('layout')).toBeInTheDocument();

    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();
  });
});
