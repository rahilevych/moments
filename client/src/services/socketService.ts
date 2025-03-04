import { io, Socket } from 'socket.io-client';
import { baseUrl } from '../utils/baseUrl';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../types/soketTypes';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const initializeSocket = (
  token: string
): Socket<ServerToClientEvents, ClientToServerEvents> => {
  if (socket) {
    socket.disconnect();
  }
  socket = io(baseUrl, {
    auth: { token },
    withCredentials: true,
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id);
  });

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
