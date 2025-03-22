import '@testing-library/jest-dom';
import 'dotenv/config';

beforeAll(() => {
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn(() => 'mocked_token'),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  Object.defineProperty(global, 'importMeta', {
    value: {
      env: {
        VITE_BASE_URL_LOCAL: 'http://localhost:3000',
      },
    },
    writable: true,
  });
});
