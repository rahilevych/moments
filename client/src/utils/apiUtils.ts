import axios from 'axios';

export const handleAxiosError = (error: unknown, message: string) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        error: error.response?.data.message || message,
        data: null,
      };
    }
    if (error.request) {
      return {
        success: false,
        status: 0,
        error: 'Network error. Please check your connection.',
        data: null,
      };
    }
  }

  return {
    success: false,
    data: null,
    status: 0,
    error: 'Unknown error. Please try later.',
  };
};
