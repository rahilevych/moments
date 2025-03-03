import { UserType } from './UserType';

export interface CommentType {
  _id: string;
  user_id: UserType;
  text: string;
  likes: string[];
  post_id: string;
  createdAt: Date;
}
