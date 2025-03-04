import CommentService from '../services/commentService.js';
import PostService from '../services/postService.js';
import { getIo } from './socketServer.js';

export const handleLikeEvent = async (socket, postId) => {
  try {
    const userId = socket.data.userId;
    if (!userId) {
      console.error('Unauthorized user attempted to like a post');
      return;
    }
    const result = await PostService.toggleLikePost(postId, userId);
    if (result.status !== 200) {
      console.error('Error toggling like:', result.data.message);
      return;
    }
    const updatedPost = result.data;
    const io = getIo();
    io.to(postId).emit('update_likes', { currentPost: updatedPost });
  } catch (error) {
    console.error('Error handling like event:', error);
  }
};
export const handleCommentEvent = async (socket, commentData) => {
  try {
    const userId = socket.data.userId;
    if (!userId) {
      console.error('Unauthorized user attempted to comment a post');
      return;
    }
    const result = await CommentService.addComment(userId, commentData);
    if (result.status !== 201) {
      console.error('Error by commenting:', result.data.message);
      return;
    }
    const comment = result.data;
    const io = getIo();

    io.to(commentData.post_id).emit('comment_added', comment);
  } catch (error) {
    console.error('Error by writting comment:', error);
  }
};

export const handleDeleteCommentEvent = async (commentId, postId, socket) => {
  try {
    const userId = socket.data.userId;
    if (!userId) {
      console.error('Unauthorized user attempted to delete comment');
      return;
    }

    const result = await CommentService.deleteComment(commentId, userId);
    if (result.status !== 200) {
      console.error('Error deleting comment:', result.data.message);
      return;
    }
    const io = getIo();
    io.to(postId).emit('comment_deleted', { commentId, postId });
  } catch (error) {
    console.error('Error deleting comment:', error.message);
  }
};
export const handleLikeCommentEvent = async (socket, commentId) => {
  try {
    const userId = socket.data.userId;
    if (!userId) {
      console.error('Unauthorized user attempted to like a comment');
      return;
    }
    const result = await CommentService.toggleLikeComment(commentId, userId);
    if (result.status !== 200) {
      console.error('Error toggling like on comment:', result.data.message);
      return;
    }
    const updatedComment = result.data;
    const postId = updatedComment.post_id.toString();
    const io = getIo();
    io.to(postId).emit('update_comment_likes', updatedComment);
  } catch (error) {
    console.error('Error handling like comment event:', error);
  }
};
