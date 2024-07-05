import mongoose, { Schema } from 'mongoose';
const postSchema = mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },
  image_url: { type: String, required: true },
  caption: { type: String },
  likes: { type: [Schema.Types.ObjectId], ref: 'user' },
  comments: { type: [Schema.Types.ObjectId], ref: 'user' },
  createdAt: { type: Date, default: Date.now },
});
export const Post = mongoose.model('post', postSchema);
