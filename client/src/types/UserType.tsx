export interface UserType {
  id: string;
  email: string;
  username: string;
  fullname: string;
  password: string;
  following: [string];
  followers: [string];
  savedPosts: [string];
  posts: [string];
}
