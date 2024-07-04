import express, { request, response } from 'express';
import { check } from 'express-validator';
import {
  getAllUsers,
  // getAllUsers,
  getUserProfile,
  login,
  registration,
} from '../controllers/userController.js';
import JWTAuth from '../middleware/JWTAuth.js';
import { userValidation } from '../validation/userValidation.js';
const usersRouter = express.Router();

usersRouter.post('/registration', userValidation, registration);

usersRouter.post('/login', login);

usersRouter.get('/profile', JWTAuth, getUserProfile);

usersRouter.get('/', getAllUsers);

// usersRouter.get('/:id', getUserById);

// usersRouter.put('/:id', updateUserById);
// usersRouter.delete('/:id', deleteUserById);

export default usersRouter;
