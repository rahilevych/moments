import { io, Socket } from 'socket.io-client';
import { getToken } from '../utils/tokenServices';
import { PostType } from '../types/PostType';

const SOCKET_URL = 'http://localhost:5001';

interface ServerToClientEvents {
  update_likes: (data: { post: PostType }) => void;
}
interface ClientToServerEvents {
  like: (postId: string) => void;
}
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SOCKET_URL,
  {
    withCredentials: true,
    auth: {
      token: getToken(),
    },
  }
);
socket.on('connect', () => {
  console.log('Connected to WebSocket', socket.id);
});

socket.on('update_likes', ({ post }) => {
  console.log(`Post ${post._id} updated with ${post.likes} `);
});

export default socket;
