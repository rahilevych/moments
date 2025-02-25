import { validationResult } from 'express-validator';
import UserService from '../services/userService.js';

export const registration = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(400)
        .json({ message: 'Validation error', errors: errors.array() });
    }
    const userData = request.body;
    console.log(userData);
    const result = await UserService.registerUser(userData);
    return response.status(result.status).json(result.data);
  } catch (error) {
    return response.status(500).json({ message: 'Server error' });
  }
};

export const login = async (request, response) => {
  try {
    const { username, password } = request.body;
    const result = await UserService.loginUser(username, password);
    return response.status(result.status).json(result.data);
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || 'Server error' });
  }
};

export const getUserProfile = async (request, response) => {
  const result = await UserService.getProfile(request.user);
  return response.status(result.status).json(result.data);
};
export const updateUser = async (request, response) => {
  try {
    const { id } = request.params;
    const updatedData = request.body;

    const result = await UserService.updateUser(id, updatedData);
    return response.status(result.status).json(result.data);
  } catch (error) {
    return response.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (request, response) => {
  try {
    const result = await UserService.getAllUsers();
    return response.status(result.status).json(result.data);
  } catch (error) {
    return response.status(500).json({ message: 'Server error' });
  }
};

export const toggleSubscribeBtn = async (request, response) => {
  try {
    const { otherUserId } = request.params;
    const userId = request.user._id;
    const result = await UserService.toggleSubscribeBtn(userId, otherUserId);
    return response.status(result.status).json(result.data);
  } catch (error) {
    return response.status(500).json({ message: 'Server error' });
  }
};

export const getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await UserService.getUserById(id);
    return response.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Server error' });
  }
};
