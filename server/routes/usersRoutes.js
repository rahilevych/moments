import express, { request, response } from 'express';

import {
  getAllUsers,
  getUserById,
  getUserProfile,
  login,
  registration,
  toggleSubscribeBtn,
} from '../controllers/userController.js';
import JWTAuth from '../middleware/JWTAuth.js';
import { userValidation } from '../validation/userValidation.js';
const usersRouter = express.Router();

usersRouter.post('/registration', userValidation, registration);

usersRouter.post('/login', login);

usersRouter.get('/profile', JWTAuth, getUserProfile);

usersRouter.get('/', JWTAuth, getAllUsers);
usersRouter.post('/:otherUserId/subscribe', JWTAuth, toggleSubscribeBtn);

usersRouter.get('/:id', getUserById);
// usersRouter.put('/:id', updateUserById);
// usersRouter.delete('/:id', deleteUserById);

export default usersRouter;
