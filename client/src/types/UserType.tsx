export interface UserType {
  _id: string;
  email: string;
  username: string;
  fullname: string;
  password: string;
  user_img: string;
  bio: string;

  following: string[];
  followers: [string];
  saved_posts: [string];
  posts: [string];
  createdAt: Date;
}
