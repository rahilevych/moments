import { PostType } from './PostType';

export interface ServerToClientEvents {
  update_likes: (data: { currentPost: PostType }) => void;
}

export interface ClientToServerEvents {
  like: (postId: string) => void;
  join: (postId: string) => void;
  leave: (postId: string) => void;
}
