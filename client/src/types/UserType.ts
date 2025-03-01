import { PostType } from './PostType';

export interface UserType {
  _id: string;
  email: string;
  username: string;
  fullname: string;
  password: string;
  user_img: string;
  bio: string;

  following: UserType[];
  followers: UserType[];
  saved_posts: PostType[];
  posts: PostType[];
  createdAt: Date;
}
