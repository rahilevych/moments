import express, { request, response } from 'express';
import { check } from 'express-validator';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  registration,
  updateUserById,
} from '../controllers/userController.js';
const usersRouter = express.Router();

usersRouter.post(
  '/registration',
  [
    check('username', 'Username is empty').notEmpty(),
    check('password', 'Password have to be longer than 6 symbols').isLength({
      min: 6,
      max: 10,
    }),
  ],
  registration
);

usersRouter.get('/', getAllUsers);

usersRouter.get('/:id', getUserById);

usersRouter.put('/:id', updateUserById);
usersRouter.delete('/:id', deleteUserById);

export default usersRouter;
