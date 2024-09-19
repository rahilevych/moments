import express, { request, response } from 'express';

import {
  addPost,
  getAllPosts,
  getPostById,
  getUserPostsByUserId,
  toggleLikePostById,
  toggleSavePostById,
} from '../controllers/postController.js';
import { multerUpload } from '../middleware/multer.js';
import JWTAuth from '../middleware/JWTAuth.js';

const postsRouter = express.Router();
postsRouter.post('/', multerUpload.single('image_url'), JWTAuth, addPost);
postsRouter.get('/user/:userId', JWTAuth, getUserPostsByUserId);
postsRouter.get('/', JWTAuth, getAllPosts);
postsRouter.post('/:id/like', JWTAuth, toggleLikePostById);
postsRouter.post('/:id/save', JWTAuth, toggleSavePostById);
postsRouter.get('/:id', JWTAuth, getPostById);
// postsRouter.put('/:id', updatePostById);
// postsRouter.delete('/:id', deletePostById);

export default postsRouter;
