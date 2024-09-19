import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  user_img: { type: String },
  bio: { type: String },
  following: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  saved_posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  createdAt: { type: Date, default: Date.now },
});
export const User = mongoose.model('user', userSchema);
