import express, { request, response } from 'express';

import {
  addComment,
  deleteCommentById,
  getAllComments,
  getCommentById,
  updateCommentById,
} from '../controllers/commentController.js';
import JWTAuth from '../middleware/JWTAuth.js';

const commentsRouter = express.Router();

commentsRouter.post('/', JWTAuth, addComment);
commentsRouter.get('/:id', getCommentById);

commentsRouter.get('/', getAllComments);
commentsRouter.put('/:id', updateCommentById);
commentsRouter.delete('/:id', deleteCommentById);

export default commentsRouter;
