import { Comment } from '../models/CommentModel.js';
import { Post } from '../models/PostModel.js';

export const addComment = async (request, response) => {
  try {
    const newComment = {
      user_id: request.user._id,
      post_id: request.body.post_id,
      text: request.body.text,
      likes: request.body.likes,
      createdAt: new Date(),
    };

    const comment = await Comment.create(newComment);
    const postId = request.body.post_id;
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    return response.status(201).json(comment);
  } catch (error) {
    console.error('Server error:', error.message);
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
    const comment = await Comment.findById(id);
    if (!comment) {
      return response.status(404).json({ message: 'Post not found' });
    }
    return response.status(200).json(comment);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};
export const updateCommentById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Comment.findByIdAndUpdate(id, request.body);
    if (!result) {
      response.status(404).json({ message: 'Comment not found' });
    }
    return response
      .status(200)
      .send({ message: 'Comment updated successfully' });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteCommentById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Comment.findByIdAndDelete(id);
    if (!result) {
      response.status(404).json({ message: 'Error' });
    }
    return response
      .status(200)
      .send({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.log(error.massege);
    response.status(500).send({ message: error.message });
  }
};
