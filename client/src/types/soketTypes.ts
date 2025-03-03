import { CommentType } from './CommentType';
import { PostType } from './PostType';

export interface ServerToClientEvents {
  update_likes: (data: { currentPost: PostType }) => void;
  update_comment_likes: (updatedComment: CommentType) => void;
}

export interface ClientToServerEvents {
  like: (postId: string) => void;
  like_comment: (commentId: string) => void;
  add_comment: (commentData: CommentType) => void;
  delete_comment: (data: { commentId: string; postId: string }) => void;

  join: (postId: string) => void;
  leave: (postId: string) => void;
}
