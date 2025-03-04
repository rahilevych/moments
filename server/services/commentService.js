import { Comment } from '../models/CommentModel.js';
import { Post } from '../models/PostModel.js';

export default class CommentService {
  static async addComment(userId, commentData) {
    try {
      if (!userId) {
        return {
          status: 400,
          data: { message: 'User ID is required to add comment.' },
        };
      }

      const newComment = await Comment.create({
        user_id: userId,
        post_id: commentData.post_id,
        text: commentData.text,
        likes: commentData.likes,
        createdAt: new Date(),
      });
      const comment = await Comment.findById(newComment._id).populate(
        'user_id',
        'username user_img'
      );

      await Post.findByIdAndUpdate(commentData.post_id, {
        $push: { comments: comment._id },
      });

      return {
        status: 201,
        data: { message: 'Comment was created successfully!', comment },
      };
    } catch (error) {
      console.error('Server error:', error.message);
      return { status: 500, message: 'Server error' };
    }
  }

  static async getAllComments() {
    try {
      const comments = await Comment.find({});
      return { status: 200, data: comments };
    } catch (error) {
      console.error('Server error:', error.message);
      return { status: 500, message: 'Server error' };
    }
  }
  static async getCommentById(id) {
    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        return { status: 404, data: { message: 'Comment not found' } };
      }
      return { status: 200, data: comment };
    } catch (error) {
      console.error('Server error:', error.message);
      return { status: 500, message: 'Server error' };
    }
  }

  static async deleteComment(id, currentUserId) {
    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        return { status: 404, data: { message: 'Comment not found' } };
      }

      const post = await Post.findById(comment.post_id);

      if (
        comment.user_id.toString() !== currentUserId &&
        post.user_id.toString() !== currentUserId
      ) {
        return {
          status: 403,
          data: { message: 'You are not allowed to delete this comment' },
        };
      }
      await Comment.findByIdAndDelete(id);
      return {
        status: 200,
        data: { message: 'Comment deleted successfully', comment },
      };
    } catch (error) {
      console.error('Server error:', error.message);
      return { status: 500, data: { message: 'Server error' } };
    }
  }
  static async toggleLikeComment(commentId, userId) {
    try {
      if (!userId) {
        return {
          status: 400,
          data: { message: 'User ID is required to toggle like.' },
        };
      }

      const comment = await Comment.findById(commentId);
      if (!comment) {
        return { status: 404, data: { message: 'Comment not found' } };
      }

      const hasLiked = comment.likes.some((id) => id.toString() === userId);
      const update = hasLiked
        ? { $pull: { likes: userId } }
        : { $addToSet: { likes: userId } };

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        update,
        { new: true }
      ).populate('user_id', 'username user_img');

      return { status: 200, data: updatedComment };
    } catch (error) {
      return {
        status: 500,
        data: { message: 'Server error', error: error.message },
      };
    }
  }
}
