import { Post } from '../models/PostModel.js';
import { User } from '../models/UserModel.js';
import ApiError from '../utils/ApiError.js';
import { imageUpload } from '../utils/imageManagement.js';

export default class PostService {
  static async addPost(file, newPost, userId) {
    if (!userId) {
      throw new ApiError('User ID is required to add post', 400);
    }
    if (file) {
      const postURL = await imageUpload(file, 'post_images');
      newPost.image_url = postURL;
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
}
