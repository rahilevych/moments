import mongoose, { Schema } from 'mongoose';
const postSchema = mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  image_url: { type: String, required: true },
  caption: { type: String },
  likes: { type: [Schema.Types.ObjectId], ref: 'User' },
  comments: { type: [Schema.Types.ObjectId], ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});
export const Post = mongoose.model('Post', postSchema);
