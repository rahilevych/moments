export interface PostType {
  _id: string;
  user_id: string;
  image_url: string;
  caption: string;
  likes: [string];
  comments: [string];
  createdAt: Date;
}
