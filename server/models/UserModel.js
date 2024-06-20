import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  user_img: String,
  bio: String,
  following: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  saved_posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
});
export const User = mongoose.model('user', userSchema);
