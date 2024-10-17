import express, { request, response } from 'express';

import {
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
import { multerUpload } from '../middleware/multer.js';
const usersRouter = express.Router();

usersRouter.post('/registration', userValidation, registration);

usersRouter.post('/login', login);

usersRouter.get('/profile', JWTAuth, getUserProfile);

usersRouter.get('/', JWTAuth, getAllUsers);
usersRouter.post('/:otherUserId/subscribe', JWTAuth, toggleSubscribeBtn);

usersRouter.get('/:id', getUserById);
usersRouter.put('/edit/:id', multerUpload.single('user_img'), updateUser);
// usersRouter.delete('/:id', deleteUserById);

export default usersRouter;
