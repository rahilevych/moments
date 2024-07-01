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
import { multerUpload } from '../middleware/multer.js';
const postsRouter = express.Router();

postsRouter.post('/', multerUpload.single('image_url'), addPost);

postsRouter.get('/', getAllPosts);

postsRouter.get('/:id', getPostById);

postsRouter.put('/:id', updatePostById);

postsRouter.delete('/:id', deletePostById);

export default postsRouter;
