export interface CommentType {
  _id: string;
  user_id: string;
  text: string;
  likes: [string];
  post_id: [string];
}
