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
