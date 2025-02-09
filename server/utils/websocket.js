import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import { User } from '../models/UserModel.js';
import { toggleLikePostById } from '../controllers/postController.js';

let io;

export const initWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:5175',
        'http://localhost:3000',
        'https://instclone-client.onrender.com',
      ],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', async (socket) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        console.log('No token provided');
        return;
      }

      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) throw new Error('User not found');

      socket.data.userId = user._id.toString();
      console.log(
        `Client connected: ${socket.id}, User ID: ${socket.data.userId}`
      );

      socket.on('like', async (postId) => {
        try {
          const updatedPost = await toggleLikePostById(
            postId,
            socket.data.userId
          );
          io.emit('update_likes', { post: updatedPost });
        } catch (error) {
          console.error('Error updating likes:', error);
        }
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    } catch (error) {
      console.error('WebSocket auth error:', error);
      return socket.disconnect();
    }
  });
};

export const getIo = () => {
  if (!io) throw new Error('WebSocket wasn`t initialized');
  return io;
};
