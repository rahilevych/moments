import { Comment } from '../models/commentModel.js';

export const addComment = async (request, response) => {
  try {
    const newComment = {
      user_id: request.body.user_id,
      post_id: request.body.post_id,
      text: request.body.text,
      likes: request.body.likes,
    };
    const comment = await Comment.create(newComment);
    return response.status(201).send(comment);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};
export const getAllComments = async (request, response) => {
  try {
    const comments = await Comment.find({});

    return response.status(200).json({ data: comments });
  } catch (error) {
    console.log(error.message);
  }
};
export const getCommentById = async (request, response) => {
  try {
    const { id } = request.params;
    console.log(`Fetching comment with id: ${id}`);
    const comment = await Comment.findById(id);
    if (!post) {
      console.log(`Comment with id: ${id} not found`);
      return response.status(404).json({ message: 'Post not found' });
    }
    console.log(`Comment with id: ${id} found`);
    return response.status(200).json(post);
  } catch (error) {
    console.log(`Error fetching comment with id: ${id} - ${error.message}`);
    response.status(500).send({ message: error.message });
  }
};
export const updateCommentById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Comment.findByIdAndUpdate(id, request.body);
    if (!result) {
      response.status(404).json({ message: 'Comment not find' });
    }
    return response
      .status(200)
      .send({ message: 'Cimment updated successfully' });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteCommentById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Comment.findByIdAndDelete(id);
    if (!result) {
      response.status(404).json({ message: 'Comment not find' });
    }
    return response
      .status(200)
      .send({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.log(error.massege);
    response.status(500).send({ message: error.message });
  }
};
