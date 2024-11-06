import { CommentType } from './CommentType';
import { UserType } from './UserType';

export interface PostType {
  _id: string;
  user_id: UserType;
  image_url: string;
  caption: string;
  likes: string[];
  comments: CommentType[];
  createdAt: Date;
}
