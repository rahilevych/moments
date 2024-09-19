import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  text: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  post_id: { type: Schema.Types.ObjectId, ref: 'post', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Comment = mongoose.model('comment', commentSchema);
