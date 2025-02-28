import { io, Socket } from 'socket.io-client';
import { baseUrl } from '../utils/baseUrl';
import { PostType } from '../types/PostType';

interface ServerToClientEvents {
  update_likes: (data: { currentPost: PostType }) => void;
}

interface ClientToServerEvents {
  like: (postId: string) => void;
  join: (postId: string) => void;
  leave: (postId: string) => void;
}

const token: string = localStorage.getItem('token') || '';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(baseUrl, {
  auth: { token },
});

export default socket;
