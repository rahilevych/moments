import { Comment } from '../models/CommentModel.js';
import { Post } from '../models/PostModel.js';

export default class CommentService {
  static async addComment(userId, commentData) {
    try {
      if (!userId) throw new Error('User ID is required to add comment');
      if (!commentData.post_id) throw new Error('Post ID is required.');

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

      return comment;
    } catch (error) {
      throw new Error(error.message || 'Server error');
    }
  }

  static async deleteComment(id, currentUserId) {
    try {
      const comment = await Comment.findById(id);
      if (!comment) throw new Error('Comment not found');

      const post = await Post.findById(comment.post_id);
      if (!post) throw new Error('Post not found');
      if (
        comment.user_id.toString() !== currentUserId &&
        post.user_id.toString() !== currentUserId
      ) {
        throw new Error('You are not allowed to delete this comment');
      }
      await Comment.findByIdAndDelete(id);
      return comment;
    } catch (error) {
      console.error('Server error:', error.message);
      throw new Error(error.message || 'Server error');
    }
  }
  static async toggleLikeComment(commentId, userId) {
    try {
      if (!userId) throw new Error('User ID is required to toggle like');

      const comment = await Comment.findById(commentId);
      if (!comment) throw new Error('Comment not found');

      const hasLiked = comment.likes.some((id) => id.toString() === userId);
      const update = hasLiked
        ? { $pull: { likes: userId } }
        : { $addToSet: { likes: userId } };

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        update,
        { new: true }
      ).populate('user_id', 'username user_img');

      return updatedComment;
    } catch (error) {
      throw new Error(error.message || 'Server error');
    }
  }
}
