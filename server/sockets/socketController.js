import jwt from 'jsonwebtoken';
import { handleLikeEvent } from './socketHandlers.js';
import { User } from '../models/UserModel.js';

export const handleSocketConnection = async (socket) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      console.error('No token provided');
      return socket.disconnect();
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error('User not found');

    socket.data.userId = user._id.toString();
    console.log(
      `Client connected: ${socket.id}, User ID: ${socket.data.userId}`
    );
    socket.on('like', (postId) => handleLikeEvent(socket, postId));
  } catch (error) {
    console.error('WebSocket auth error:', error);
    socket.disconnect();
  }
};
