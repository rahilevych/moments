import express from 'express';

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
commentsRouter.get('/:id', JWTAuth, getCommentById);

commentsRouter.get('/', JWTAuth, getAllComments);
commentsRouter.put('/:id', JWTAuth, updateCommentById);
commentsRouter.delete('/:id', JWTAuth, deleteCommentById);

export default commentsRouter;
