import PostService from '../services/postService.js';

export const addPost = async (request, response, next) => {
  try {
    const newPost = request.body;
    const result = await PostService.addPost(
      request.file,
      newPost,
      request.user._id
    );
    return response.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserPostsByUserId = async (request, response, next) => {
  try {
    const userId = request.params.userId;
    const result = await PostService.getUserPostsByUserId(userId);
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (request, response, next) => {
  try {
    const result = await PostService.getAllPosts();
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (request, response, next) => {
  const { id } = request.params;
  try {
    const result = await PostService.getPostById(id);

    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
