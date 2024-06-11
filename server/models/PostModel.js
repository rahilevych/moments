import mongoose from 'mongoose';
const postSchema = mongoose.Schema({
  user_id: String,
  image_url: String,
  caption: String,
  likes: [String],
});
export const Post = mongoose.model('post', postSchema);
