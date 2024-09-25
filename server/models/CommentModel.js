import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Comment = mongoose.model('Comment', commentSchema);
