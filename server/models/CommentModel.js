import mongoose from 'mongoose';
const commentSchema = mongoose.Schema({
  user_id: String,
  post_id: String,
  text: String,
  likes: [String],
});
export const Comment = mongoose.model('comment', commentSchema);
