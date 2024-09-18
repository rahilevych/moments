import { Post } from '../models/postModel.js';
import { User } from '../models/userModel.js';
import { imageUpload } from '../utils/imageManagement.js';
import { removeTempFile } from '../utils/tempFileManagment.js';

export const addPost = async (request, response) => {
  console.log(request.file);
  try {
    const newPost = {
      user_id: request.body.user_id,
      caption: request.body.caption,
      likes: request.body.likes,
      comments: request.body.comments,
      createdAt: new Date(),
    };

    if (request.file) {
      const postURL = await imageUpload(request.file, 'post_images');
      newPost.image_url = postURL;
    }
    const post = await Post.create(newPost);
    const userId = request.user._id;
    await User.findByIdAndUpdate(userId, { $push: { posts: post._id } });
    return response.status(201).json(post);
  } catch (error) {
    response.status(500).send({ message: error.message });
  } finally {
    removeTempFile(request.file);
  }
};
export const getUserPostsByUserId = async (request, response) => {
  try {
    const userId = request.params.userId;
    const posts = await Post.find({ user_id: userId });
    response.status(200).json(posts);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

export const toggleSavePostById = async (request, response) => {
  try {
    const { id } = request.params;
    const userId = request.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    if (!Array.isArray(user.saved_posts)) {
      user.saved_posts = [];
    }
    const isSaved = user.saved_posts.includes(id);
    if (!isSaved) {
      user.saved_posts.push(id);
    } else {
      user.saved_posts = user.saved_posts.filter(
        (postId) => postId.toString() !== id
      );
    }
    await user.save();
    return response.status(200).json({ user });
  } catch (error) {
    return response.status(500).json({ message: 'Server error' });
  }
};

export const toggleLikePostById = async (request, response) => {
  try {
    const { id } = request.params;
    const userId = request.user._id;
    const post = await Post.findById(id);
    if (!post) {
      return response.status(404).json({ message: 'Post not found' });
    }
    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    return response.status(200).json(post);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

export const getAllPosts = async (request, response) => {
  try {
    const posts = await Post.find({});

    return response.status(200).json({ data: posts });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostById = async (request, response) => {
  try {
    const { id } = request.params;
    console.log('postId', id);
    console.log(`Fetching post with id: ${id}`);
    const post = await Post.findById(id);
    if (!post) {
      console.log(`Post with id: ${id} not found`);
      return response.status(404).json({ message: 'Post not found' });
    }
    console.log(`Post with id: ${id} found`);
    return response.status(200).json(post);
  } catch (error) {
    console.log(`Error fetching user with id: ${id} - ${error.message}`);
    response.status(500).send({ message: error.message });
  }
};

// export const updatePostById = async (request, response) => {
//   try {
//     const { id } = request.params;
//     const result = await Post.findByIdAndUpdate(id, request.body);
//     if (!result) {
//       response.status(404).json({ message: 'Post not find' });
//     }
//     return response.status(200).send({ message: 'Post updated successfully' });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const deletePostById = async (request, response) => {
//   try {
//     const { id } = request.params;
//     const result = await Post.findByIdAndDelete(id);
//     if (!result) {
//       response.status(404).json({ message: 'Post not find' });
//     }
//     return response.status(200).send({ message: 'Post deleted successfully' });
//   } catch (error) {
//     console.log(error.massege);
//     response.status(500).send({ message: error.message });
//   }
// };
