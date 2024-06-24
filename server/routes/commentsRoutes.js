import express, { request, response } from 'express';
import { User } from '../models/userModel.js';
import { Post } from '../models/postModel.js';
import { Comment } from '../models/commentModel.js';
import {
  addComment,
  deleteCommentById,
  getAllComments,
  getCommentById,
  updateCommentById,
} from '../controllers/commentController.js';

const commentsRouter = express.Router();

commentsRouter.post('/', addComment);

commentsRouter.get('/', getAllComments);

commentsRouter.get('/:id', getCommentById);

commentsRouter.put('/:id', updateCommentById);
commentsRouter.delete('/:id', deleteCommentById);

export default commentsRouter;
