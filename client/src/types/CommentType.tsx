import { PostType } from './PostType';
import { UserType } from './UserType';

export interface CommentType {
  _id: string;
  user_id: UserType;
  text: string;
  likes: UserType[];
  post_id: PostType;
}
