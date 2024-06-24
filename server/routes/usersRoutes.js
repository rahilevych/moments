import express, { request, response } from 'express';

import {
  addUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../controllers/userController.js';
const usersRouter = express.Router();

usersRouter.post('/', addUser);

usersRouter.get('/', getAllUsers);

usersRouter.get('/:id', getUserById);

usersRouter.put('/:id', updateUserById);
usersRouter.delete('/:id', deleteUserById);

export default usersRouter;
