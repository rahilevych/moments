import express, { request, response } from 'express';
import { User } from '../models/UserModel.js';
const usersRouter = express.Router();

usersRouter.post('/', async (request, response) => {
  try {
    const newUser = {
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
      userImg: request.body.user_img,
      bio: request.body.bio,
      following: request.body.following,
      followers: request.body.followers,
      posts: request.body.posts,
      savedPosts: request.body.savedPosts,
    };
    const user = await User.create(newUser);
    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).json({ data: users });
  } catch (error) {
    console.log(error.message);
  }
});

usersRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    console.log(`Fetching user with id: ${id}`);
    const user = await User.findById(id);
    if (!user) {
      console.log(`User with id: ${id} not found`);
      return response.status(404).json({ message: 'User not found' });
    }
    console.log(`User with id: ${id} found`);
    return response.status(200).json(user);
  } catch (error) {
    console.log(`Error fetching user with id: ${id} - ${error.message}`);
    response.status(500).send({ message: error.message });
  }
});

usersRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await User.findByIdAndUpdate(id, request.body);
    if (!result) {
      response.status(404).json({ message: 'Book not find' });
    }
    return response.status(200).send({ message: 'Book updeteed successfully' });
  } catch (error) {
    console.log(error.message);
  }
});
usersRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      response.status(404).json({ message: 'User not find' });
    }
    return response.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error.massege);
    response.status(500).send({ message: error.message });
  }
});

export default usersRouter;
