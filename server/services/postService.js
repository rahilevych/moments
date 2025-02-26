import { Post } from '../models/PostModel.js';
import { User } from '../models/UserModel.js';
import { imageUpload } from '../utils/imageManagement.js';
import { removeTempFile } from '../utils/tempFileManagment.js';
import { getIo } from '../utils/websocket.js';

export default class PostService {
  static async addPost(file, newPost, userId) {
    try {
      if (!userId) {
        return {
          status: 400,
          data: { message: 'User ID is required to fetch posts.' },
        };
      }
      if (file) {
        const postURL = await imageUpload(file, 'post_images');
        newPost.image_url = postURL;
      }
      const post = await Post.create(newPost);
      await User.findByIdAndUpdate(userId, { $push: { posts: post._id } });
      return { status: 201, data: { post, message: 'Post was created !' } };
    } catch (error) {
      console.error('Error in addPost:', error);
      return { status: 500, data: { message: 'Error by creating post' } };
    } finally {
      if (file) {
        removeTempFile(file);
      }
    }
  }

  static async getUserPostsByUserId(userId) {
    try {
      if (!userId) {
        return {
          status: 400,
          data: { message: 'User ID is required to fetch posts.' },
        };
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
      console.log(posts);
      return { status: 200, data: { message: 'User`s posts', posts } };
    } catch (error) {
      return { status: 500, data: { message: 'Error by getting posts' } };
    }
  }
  static async getAllPosts() {
    try {
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

      return { status: 200, data: { posts } };
    } catch (error) {
      return { status: 500, data: { message: 'Error by fetching posts' } };
    }
  }
  static async getPostById(id) {
    try {
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
        console.warn(`Post with id: ${id} not found`);
        return { status: 404, data: { message: 'Post not found' } };
      }

      console.log(`Post with id: ${id} found`);
      return { status: 200, data: { post } };
    } catch (error) {
      console.error(`Error fetching post with id: ${id} - ${error.message}`);
      return { status: 500, data: { message: 'Server error' } };
    }
  }
}
