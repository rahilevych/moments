import mongoose from 'mongoose';
import { Post } from '../models/PostModel.js';
import { User } from '../models/UserModel.js';
import ApiError from '../utils/ApiError.js';

import { Comment } from '../models/CommentModel.js';
import deleteImageFromCloudinary from './cloudinaryService.js';

export default class PostService {
  static async addPost(file, newPost, userId) {
    if (!userId) {
      throw new ApiError('User ID is required to add post', 400);
    }
    if (file) {
      newPost.image_url = file.path;
    }
    const post = await Post.create(newPost);
    await User.findByIdAndUpdate(userId, { $push: { posts: post._id } });
    return post;
  }

  static async getUserPostsByUserId(userId) {
    if (!userId) {
      throw new ApiError('User ID is required to fetch posts', 400);
    }
    const posts = await Post.find({ user_id: userId })
      .populate({
        path: 'comments',
        populate: {
          path: 'user_id',
          model: 'User',
        },
      })
      .populate({
        path: 'user_id',
        model: 'User',
      });

    return posts;
  }
  static async getAllPosts() {
    const posts = await Post.find({})
      .populate({
        path: 'comments',
        populate: {
          path: 'user_id',
          model: 'User',
        },
      })
      .populate({
        path: 'user_id',
        model: 'User',
      });

    return posts;
  }
  static async getPostById(id) {
    const post = await Post.findById(id)
      .populate({
        path: 'comments',
        populate: {
          path: 'user_id',
          model: 'User',
        },
      })
      .populate({
        path: 'user_id',
        model: 'User',
      });

    if (!post) {
      throw new ApiError('Post not found', 404);
    }

    return post;
  }
  static async toggleLikePost(postId, userId) {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }
      if (!userId) {
        throw new Error('User ID is required to toggle like');
      }
      const likeIndex = post.likes.findIndex((id) => id.toString() === userId);
      if (likeIndex !== -1) {
        post.likes.splice(likeIndex, 1);
      } else {
        post.likes.push(userId);
      }
      await post.save();
      return post;
    } catch (error) {
      throw new Error(error.message || 'Server error');
    }
  }

  static async deletePostById(postId, userId) {
    console.log(postId);
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new ApiError('Invalid post ID', 400);
    }
    const post = await Post.findById(postId);
    if (post && post.image_url) {
      await deleteImageFromCloudinary(post.image_url);
    }

    if (!post) {
      throw new ApiError('Post not found', 404);
    }
    console.log('post user', post.user_id);
    console.log(' user', userId);
    if (post.user_id.toString() !== userId.toString()) {
      throw new ApiError('You are not authorized to delete this post', 403);
    }
    await Comment.deleteMany({ post_id: postId });
    await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });
    await Post.deleteOne({ _id: postId });
  }
}
