import PostService from '../services/postService.js';

export const addPost = async (request, response) => {
  try {
    const newPost = request.body;
    const result = await PostService.addPost(
      request.file,
      newPost,
      request.user._id
    );
    return response.status(result.status).json(result.data);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

export const getUserPostsByUserId = async (request, response) => {
  const userId = request.params.userId;
  const result = await PostService.getUserPostsByUserId(userId);
  return response.status(result.status).json(result.data);
};

export const getAllPosts = async (request, response) => {
  try {
    const result = await PostService.getAllPosts();
    return response.status(result.status).json(result.data);
  } catch (error) {
    return response.status(500).json({ message: 'Internal server error' });
  }
};

export const getPostById = async (request, response) => {
  const { id } = request.params;
  try {
    const result = await PostService.getPostById(id);
    console.log(`Fetching post with id: ${id}`);
    return response.status(result.status).json(result.data);
  } catch (error) {
    console.error(`Error fetching post with id: ${id} - ${error.message}`);
    return response.status(500).json({ message: 'Server error' });
  }
};

// export const toggleSavePostById = async (request, response) => {
//   try {
//     const { id } = request.params;
//     const userId = request.user._id;
//     const user = await User.findById(userId);
//     if (!user) {
//       return response.status(404).json({ message: 'User not found' });
//     }
//     if (!Array.isArray(user.saved_posts)) {
//       user.saved_posts = [];
//     }
//     const isSaved = user.saved_posts.includes(id);
//     if (!isSaved) {
//       user.saved_posts.push(id);
//     } else {
//       user.saved_posts = user.saved_posts.filter(
//         (postId) => postId.toString() !== id
//       );
//     }
//     await user.save();
//     return response.status(200).json({ user });
//   } catch (error) {
//     return response.status(500).json({ message: 'Server error' });
//   }
// };

// export const toggleLikePostById = async (postId, userId) => {
//   try {
//     const post = await Post.findById(postId);
//     if (!post) {
//       throw new Error('Post not found');
//     }
//     if (!userId) {
//       throw new Error('Unauthorized: userId is missing');
//     }

//     //const likeIndex = post.likes.indexOf(userId);
//     const likeIndex = post.likes.findIndex((id) => id.toString() === userId);
//     console.log(likeIndex);
//     if (likeIndex !== -1) {
//       post.likes.splice(likeIndex, 1);
//     } else {
//       post.likes.push(userId);
//     }

//     await post.save();
//     const io = getIo();
//     io.emit('update_likes', { post });

//     return post;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

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
