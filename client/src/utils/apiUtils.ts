import axios from 'axios';

export const handleAxiosError = (error: any, message: string) => {
  if (axios.isAxiosError(error) && error.response) {
    console.error(
      `${message}: ${error.response.status} - ${error.response.data?.message}`
    );
    return {
      success: false,
      error: error.response.data?.message || 'Server Error',
    };
  }
  console.error('Network or unexpected error:', error);
  return { success: false, error: 'Network error. Please try again.' };
};
