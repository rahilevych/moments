import { validationResult } from 'express-validator';
import UserService from '../services/userService.js';

export const registration = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      throw new ApiError('Validation error', 400, errors.array());
    }
    const userData = request.body;
    const result = await UserService.registerUser(userData);
    return response.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (request, response, next) => {
  try {
    const { username, password } = request.body;
    const result = await UserService.loginUser(username, password);

    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (request, response, next) => {
  try {
    const result = await UserService.getProfile(request.user);
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (request, response, next) => {
  try {
    const { id } = request.params;
    const updatedData = request.body;

    const result = await UserService.updateUser(id, updatedData);
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (request, response, next) => {
  try {
    const result = await UserService.getAllUsers();
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const toggleSubscribeBtn = async (request, response, next) => {
  try {
    const { otherUserId } = request.params;
    const userId = request.user._id;
    const result = await UserService.toggleSubscribeBtn(userId, otherUserId);
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const result = await UserService.getUserById(id);
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
