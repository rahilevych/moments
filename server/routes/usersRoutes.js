import express, { request, response } from 'express';

import {
  deleteUserById,
  getAllUsers,
  getUserById,
  getUserProfile,
  login,
  registration,
  toggleSubscribeBtn,
  updateUser,
} from '../controllers/userController.js';
import JWTAuth from '../middleware/JWTAuth.js';
import { userValidation } from '../validation/userValidation.js';
import upload from '../config/multer.js';

const usersRouter = express.Router();

usersRouter.post('/registration', userValidation, registration);

usersRouter.post('/login', login);

usersRouter.get('/profile', JWTAuth, getUserProfile);

usersRouter.get('/', JWTAuth, getAllUsers);
usersRouter.post('/:otherUserId/subscribe', JWTAuth, toggleSubscribeBtn);

usersRouter.get('/:id', getUserById);
usersRouter.delete('/delete/:id', JWTAuth, deleteUserById);
usersRouter.put('/edit/:id', upload.single('user_img'), updateUser);

export default usersRouter;
