import express, { request, response } from 'express';
import { User } from '../models/userModel.js';
import { Post } from '../models/postModel.js';
import {
  addPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from '../controllers/postController.js';
const postsRouter = express.Router();

postsRouter.post('/', addPost);

postsRouter.get('/', getAllPosts);

postsRouter.get('/:id', getPostById);

postsRouter.put('/:id', updatePostById);
postsRouter.delete('/:id', deletePostById);

export default postsRouter;
