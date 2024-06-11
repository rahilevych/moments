import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  user_img: String,
  bio: String,
  following: [String],
  followers: [String],
  savedPosts: [String],
  posts: [String],
});
export const User = mongoose.model('user', userSchema);
