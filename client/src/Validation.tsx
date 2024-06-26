export const validateEmail = (email: string) => {
  if (!email) {
    return 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return 'invalid  email';
  }
};
export const validatePassword = (password: string) => {
  if (!password) {
    return 'Password is required';
  } else if (password.length < 6) {
    return 'Password is too short';
  }
  return '';
};
