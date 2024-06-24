import express, { request, response } from 'express';

import {
  deleteUserById,
  getAllUsers,
  getUserById,
  registration,
  updateUserById,
} from '../controllers/userController.js';
const usersRouter = express.Router();

usersRouter.post('/', registration);

usersRouter.get('/', getAllUsers);

usersRouter.get('/:id', getUserById);

usersRouter.put('/:id', updateUserById);
usersRouter.delete('/:id', deleteUserById);

export default usersRouter;
