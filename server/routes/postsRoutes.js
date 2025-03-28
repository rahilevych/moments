import express from 'express';

import {
  addPost,
  deletePostById,
  getAllPosts,
  getPostById,
  getUserPostsByUserId,
} from '../controllers/postController.js';

import JWTAuth from '../middleware/JWTAuth.js';
import upload from '../config/multer.js';

const postsRouter = express.Router();
postsRouter.post('/', upload.single('image_url'), JWTAuth, addPost);
postsRouter.get('/user/:userId', JWTAuth, getUserPostsByUserId);
postsRouter.get('/', JWTAuth, getAllPosts);
postsRouter.get('/:id', JWTAuth, getPostById);
postsRouter.delete('/delete/:id', JWTAuth, deletePostById);

export default postsRouter;
