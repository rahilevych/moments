import express, { request, response } from 'express';
import { User } from '../models/userModel.js';
import { Post } from '../models/postModel.js';
import {
  addPost,
  // deletePostById,
  // getAllPosts,
  // getPostById,
  // updatePostById,
  getUserPostsByUserId,
  toggleLikePostById,
  toggleSavePostById,
} from '../controllers/postController.js';
import { multerUpload } from '../middleware/multer.js';
import JWTAuth from '../middleware/JWTAuth.js';

const postsRouter = express.Router();
postsRouter.post('/', multerUpload.single('image_url'), JWTAuth, addPost);
postsRouter.get('/', JWTAuth, getUserPostsByUserId);
postsRouter.post('/:id/like', JWTAuth, toggleLikePostById);
postsRouter.post('/:id/save', JWTAuth, toggleSavePostById);

// postsRouter.get('/:id', getPostById);
// postsRouter.put('/:id', updatePostById);
// postsRouter.delete('/:id', deletePostById);

export default postsRouter;
