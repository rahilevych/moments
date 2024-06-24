import bcrypt from 'bcrypt';
export const encryptPass = async (password) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log('Error by password hashing', error);
    return null;
  }
};
