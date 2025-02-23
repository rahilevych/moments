import { User } from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import { encryptPass } from '../utils/passServices.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { secret } from '../config/token.js';
import mongoose from 'mongoose';

export const registration = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(400)
        .json({ message: 'Validation error', errors: errors.array() });
    }

    const { email, username, fullname, password } = request.body;
    console.log('Request Body:', request.body);

    const existingEmailUser = await User.findOne({ email });
    const existingUsernameUser = await User.findOne({ username });

    if (existingEmailUser) {
      return response
        .status(400)
        .json({
          field: 'email',
          message: 'User with this email already exists',
        });
    }

    if (existingUsernameUser) {
      return response
        .status(400)
        .json({
          field: 'username',
          message: 'User with this username already exists',
        });
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
    return response.status(201).json({ message: 'User was signed up' });
  } catch (error) {
    return response.status(500).json({ message: 'Server error' });
  }
};

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

export const login = async (request, response) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).json({ message: `Incorrect username` });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return response.status(401).json({ message: `Incorrect password` });
    }
    const token = generateAccessToken(user._id);
    return response.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return response
      .status(500)
      .json({ message: error.message || 'Internal server error' });
  }
};

export const getUserProfile = async (request, response) => {
  if (request.user) {
    return response.status(200).json({
      message: 'user profile information',
      user: {
        _id: request.user._id,
        email: request.user.email,
        username: request.user.username,
        likes: request.user.likes,
        saved_posts: request.user.saved_posts,
        fullname: request.user.fullname,
        user_img: request.user.user_img,
        bio: request.user.bio,
        following: request.user.following,
        followers: request.user.followers,
        posts: request.user.posts,
        createdAt: request.user.createdAt,
      },
    });
  }
};
export const updateUser = async (request, response) => {
  try {
    const { id } = request.params;

    const updateData = {
      username: request.body.username,
      fullname: request.body.fullname,
      email: request.body.email,
      bio: request.body.bio,
      user_img: request.body.user_img,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    if (Object.keys(updateData).length === 0) {
      return response.status(400).json({ message: 'No data to update' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response
      .status(200)
      .json({ message: 'Profile was updated', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return response
      .status(500)
      .json({ message: error.message || 'Server error' });
  } finally {
    if (request.file && typeof removeTempFile === 'function') {
      removeTempFile(request.file);
    }
  }
};

export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json({ data: users });
  } catch (error) {
    return response.status(500).json({ error: 'Server error' });
  }
};

export const toggleSubscribeBtn = async (request, response) => {
  try {
    const { otherUserId } = request.params;
    const userId = request.user._id;

    if (!mongoose.Types.ObjectId.isValid(otherUserId)) {
      return response.status(400).json({ message: 'Invalid user ID' });
    }

    if (userId.toString() === otherUserId) {
      return response
        .status(400)
        .json({ message: 'You cannot subscribe to yourself' });
    }

    const user = await User.findById(userId);
    const otherUser = await User.findById(otherUserId);

    if (!user || !otherUser) {
      return response.status(404).json({ message: 'User not found' });
    }

    const isFollowing = user.following.includes(otherUserId);
    if (isFollowing) {
      user.following = user.following.filter(
        (id) => id.toString() !== otherUserId
      );
      otherUser.followers = otherUser.followers.filter(
        (id) => id.toString() !== userId
      );
    } else {
      user.following.push(otherUserId);
      otherUser.followers.push(userId);
    }

    await user.save();
    await otherUser.save();

    const users = await User.find({});
    return response.status(200).json({ data: users });
  } catch (error) {
    console.error('Error by subscribing:', error.message);
    return response
      .status(500)
      .json({ message: error.message || 'Server error' });
  }
};

export const getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id)
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
      return response.status(404).json({ message: 'User not found' });
    }

    response.status(200).json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Server error' });
  }
};
