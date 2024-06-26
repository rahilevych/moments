export interface UserType {
  user_id: string;
  useraname: string;
  password: string;
  following: [string];
  followers: [string];
  savedPosts: [string];
  posts: [string];
}
