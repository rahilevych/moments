import jwt from 'jsonwebtoken';
import { secret } from '../config/token.js';
import { encryptPass } from '../utils/passServices.js';
import mongoose from 'mongoose';
import { User } from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import ApiError from '../utils/ApiError.js';
import { Post } from '../models/PostModel.js';
import { Comment } from '../models/CommentModel.js';
import deleteImageFromCloudinary from './cloudinaryService.js';

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

export default class UserService {
  static async registerUser({ email, username, fullname, password }) {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ApiError('User with this email already exists', 409, 'email');
      }
      if (existingUser.username === username) {
        throw new ApiError(
          'User with this username already exists',
          409,
          'username'
        );
      }
    }
    const hashedPass = await encryptPass(password);
    const newUser = new User({
      email,
      username,
      fullname,
      password: hashedPass,
      createdAt: new Date(),
    });

    await newUser.save();
    return newUser;
  }

  static async loginUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new ApiError(`User not found`, 404);
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      throw new ApiError(`Incorrect password`, 401);
    }
    const token = generateAccessToken(user._id);
    console.log(token);
    return token;
  }

  static async getProfile(user) {
    if (!user) {
      throw new ApiError(`Unauthorized`, 401);
    }
    return user;
  }

  static async updateUser(id, updatedData, file) {
    const updateData = { ...updatedData };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );
    if (Object.keys(updateData).length === 0) {
      throw new ApiError(`No data to update'`, 422);
    }
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new ApiError(`User not found`, 404);
    }
    if (file) {
      if (existingUser.user_img) {
        await deleteImageFromCloudinary(existingUser.user_img);
      }
      updateData.user_img = file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return updatedUser;
  }

  static async getAllUsers() {
    const users = await User.find({});
    return users;
  }

  static async toggleSubscribeBtn(userId, otherUserId) {
    if (!mongoose.Types.ObjectId.isValid(otherUserId)) {
      throw new ApiError('Invalid user ID', 400);
    }

    if (userId.toString() === otherUserId) {
      throw new ApiError('You cannot subscribe to yourself', 400);
    }

    const user = await User.findById(userId);
    const otherUser = await User.findById(otherUserId);

    if (!user || !otherUser) {
      throw new ApiError(`User not found`, 404);
    }

    const isFollowing = user.following.includes(otherUserId);
    if (isFollowing) {
      await User.updateOne(
        { _id: userId },
        { $pull: { following: otherUserId } }
      );
      await User.updateOne(
        { _id: otherUserId },
        { $pull: { followers: userId } }
      );
    } else {
      await User.updateOne(
        { _id: userId },
        { $addToSet: { following: otherUserId } }
      );
      await User.updateOne(
        { _id: otherUserId },
        { $addToSet: { followers: userId } }
      );
    }

    return user;
  }

  static async getUserById(userId) {
    const user = await User.findById(userId)
      .populate({
        path: 'following',
        populate: {
          path: 'posts',
          model: 'Post',
          populate: {
            path: 'user_id',
            model: 'User',
          },
        },
      })
      .populate({
        path: 'followers',
        populate: {
          path: 'posts',
          model: 'Post',
          populate: {
            path: 'user_id',
            model: 'User',
          },
        },
      });

    if (!user) {
      throw new ApiError(`User not found`, 404);
    }

    return user;
  }

  static async deleteUserById(userId) {
    try {
      const userPosts = await Post.find({ user_id: userId }).select(
        '_id image_url'
      );

      await Promise.all(
        userPosts.map((post) => deleteImageFromCloudinary(post.image_url))
      );

      const user = await User.findById(userId);
      if (user?.user_img) {
        await deleteImageFromCloudinary(user.user_img);
      }

      const userComments = await Comment.find({ user_id: userId }).select(
        '_id'
      );

      const postIds = userPosts.map((post) => post._id);
      const commentIds = userComments.map((comment) => comment._id);

      await Promise.all([
        Post.deleteMany({ user_id: userId }),
        Comment.deleteMany({ user_id: userId }),
        Comment.deleteMany({ post_id: { $in: postIds } }),
        Post.updateMany(
          { _id: { $in: postIds } },
          { $pull: { likes: userId } }
        ),
        Comment.updateMany(
          { _id: { $in: commentIds } },
          { $pull: { likes: userId } }
        ),

        Post.updateMany({ likes: userId }, { $pull: { likes: userId } }),
        Comment.updateMany({ likes: userId }, { $pull: { likes: userId } }),
        User.findByIdAndDelete(userId),
      ]);
    } catch (error) {
      console.error('Error delete user', error);
    }
  }
}
