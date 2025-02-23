export const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? '' : 'Invalid email format';
};
export const validateUsername = (value: string) => {
  return value.length >= 3 && value.length <= 20
    ? ''
    : 'Username must be 3-20 characters';
};
export const validateFullname = (value: string) => {
  return value.length >= 6 ? '' : 'Full name must be at least 4 characters ';
};
export const validatePassword = (value: string) => {
  return value.length >= 6 ? '' : 'Password must be at least 6 characters';
};
