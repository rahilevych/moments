import { Server } from 'socket.io';
import { handleSocketConnection } from './socketController.js';

let io;

export const initSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:3001',
        'https://instclone-client.onrender.com',
      ],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    handleSocketConnection(socket);
    socket.on('join', (postId) => {
      socket.join(postId);
      console.log(`Socket ${socket.id} joined room ${postId}`);
    });

    socket.on('leave', (postId) => {
      socket.leave(postId);
      console.log(`Socket ${socket.id} left room ${postId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

export const getIo = () => {
  if (!io) throw new Error('Socket.io has not been initialized');
  return io;
};
