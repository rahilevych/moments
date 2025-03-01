import jwt from 'jsonwebtoken';
import { secret } from '../config/token.js';
import { encryptPass } from '../utils/passServices.js';
import mongoose from 'mongoose';
import { User } from '../models/UserModel.js';
import bcrypt from 'bcrypt';

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

export default class UserService {
  static async registerUser({ email, username, fullname, password }) {
    try {
      const existingEmailUser = await User.findOne({ email });
      const existingUsernameUser = await User.findOne({ username });

      if (existingEmailUser) {
        return {
          status: 400,
          data: {
            field: 'email',
            message: 'User with this email already exists',
          },
        };
      }
      if (existingUsernameUser) {
        return {
          status: 400,
          data: {
            field: 'username',
            message: 'User with this username already exists',
          },
        };
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
      return { status: 201, data: { message: 'User was signed up' } };
    } catch (error) {
      return { status: 500, data: { message: 'Server error' } };
    }
  }

  static async loginUser(username, password) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return { status: 404, data: { message: `User not found` } };
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return { status: 401, data: { message: `Incorrect password` } };
      }
      const token = generateAccessToken(user._id);

      return { status: 200, data: { token } };
    } catch (error) {
      console.error('Login error:', error);
      return { status: 500, data: { message: 'Server error' } };
    }
  }
  static async getProfile(user) {
    if (!user) {
      return { status: 401, data: { message: 'Unauthorized' } };
    }

    return { status: 200, data: { message: 'User profile info', user } };
  }

  static async updateUser(id, updatedData) {
    try {
      const updateData = { ...updatedData };

      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );
      if (Object.keys(updateData).length === 0) {
        return { status: 400, data: { message: 'No data to update' } };
      }
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedUser) {
        return { status: 404, data: { message: 'User not found' } };
      }
      return {
        status: 200,
        data: { message: 'Profile was updated', user: updatedUser },
      };
    } catch (error) {
      return { status: 500, data: { message: 'Server error' } };
    }
  }

  static async getAllUsers() {
    try {
      const users = await User.find({});
      return { status: 200, data: { users } };
    } catch (error) {
      return { status: 500, data: { message: 'Server error' } };
    }
  }

  static async toggleSubscribeBtn(userId, otherUserId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(otherUserId)) {
        return { status: 400, data: { message: 'Invalid user ID' } };
      }

      if (userId.toString() === otherUserId) {
        return {
          status: 400,
          data: { message: 'You cannot subscribe to yourself' },
        };
      }

      const user = await User.findById(userId);
      const otherUser = await User.findById(otherUserId);

      if (!user || !otherUser) {
        return { status: 404, data: { message: 'User not found' } };
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

      return { status: 200, data: { message: 'Subscription updated' } };
    } catch (error) {
      return { status: 500, data: { message: 'Server error' } };
    }
  }

  static async getUserById(userId) {
    try {
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
        return { status: 404, data: { message: 'User not found' } };
      }

      return { status: 200, data: user };
    } catch (error) {
      console.error('Error fetching user:', error);
      return { status: 500, data: { message: 'Server error' } };
    }
  }
}
