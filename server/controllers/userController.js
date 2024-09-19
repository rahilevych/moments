import { User } from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import { encryptPass } from '../utils/passServices.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { secret } from '../config/token.js';

export const registration = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(400)
        .json({ message: 'Error during registration', errors });
    }

    const { email, username, fullname, password } = request.body;
    console.log('Request Body:', request.body);

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return response
        .status(400)
        .json({ message: 'User with this email or username already exists' });
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
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  if (!user) {
    return response.status(400).json({ massage: `user ${username} not found` });
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return response.status(400).json({ massage: `Incorrect password` });
  }
  const token = generateAccessToken(user._id);
  return response.json({ token });
};

export const getUserProfile = async (request, response) => {
  if (request.user) {
    response.status(200).json({
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

    const user = await User.findById(userId);
    const otherUser = await User.findById(otherUserId);

    console.log('user from  back', user);
    console.log('user2 from  back', otherUser);

    if (!user || !otherUser) {
      return response.status(404).json({ message: 'User not found' });
    }

    const isFollowing = user.following.includes(otherUserId);
    const isFollower = otherUser.followers.includes(userId);

    if (isFollowing && isFollower) {
      user.following = user.following.filter(
        (id) => id.toString() !== otherUserId
      );
      otherUser.followers = otherUser.followers.filter(
        (id) => id.toString() !== userId
      );
    } else if (!isFollowing && !isFollower) {
      user.following.push(otherUserId);
      otherUser.followers.push(userId);
    } else {
      if (isFollowing) {
        user.following = user.following.filter(
          (id) => id.toString() !== otherUserId
        );
      } else {
        user.following.push(otherUserId);
      }
      if (isFollower) {
        otherUser.followers = otherUser.followers.filter(
          (id) => id.toString() !== userId
        );
      } else {
        otherUser.followers.push(userId);
      }
    }

    await user.save();
    await otherUser.save();

    const users = await User.find({});
    return response.status(200).json({ data: users });
  } catch (error) {
    console.error('Error by subscribing:', error.message);
    return response.status(500).json({ message: 'Server error' });
  }
};

// export const toggleSubscribeBtn = async (request, response) => {
//   try {
//     const { otherUserId } = request.params;
//     const userId = request.user._id;
//     const user = await User.findById(userId);
//     const otherUser = await User.findById(otherUserId);
//     console.log('user from  back', user);
//     console.log('user2 from  back', otherUser);
//     if (!user || !otherUser) {
//       return response.status(404).json({ message: 'User not found' });
//     }
//     const isFollowing = user.following.includes(otherUserId);
//     const isFollower = otherUser.followers.includes(userId);

//     if (!isFollowing && !isFollower) {
//       user.following.push(otherUserId);
//       otherUser.followers.push(userId);
//     } else if (isFollowing && isFollower) {
//       user.following = user.following.filter(
//         (id) => id.toString() !== otherUserId
//       );
//       otherUser.followers = otherUser.followers.filter(
//         (id) => id.toString() !== userId
//       );
//     } else {
//       return response
//         .status(400)
//         .json({ message: 'Invalid follow/unfollow state' });
//     }
//     await user.save();
//     await otherUser.save();
//     const users = await User.find({});
//     return response.status(200).json({ data: users });
//   } catch (error) {
//     console.error('Error by subscribing:', error.message);
//     return response.status(500).json({ message: 'Server error' });
//   }
// };
export const getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id).populate('posts');
    if (!user) {
      return response.status(404).json({ message: 'User not found ' });
    }
    response.status(200).json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Server error' });
  }
};
// export const updateUserById = async (request, response) => {
//   try {
//     const { id } = request.params;
//     const result = await User.findByIdAndUpdate(id, request.body);
//     if (!result) {
//       response.status(404).json({ message: 'Book not find' });
//     }
//     return response.status(200).send({ message: 'Book updeteed successfully' });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// export const deleteUserById = async (request, response) => {
//   try {
//     const { id } = request.params;
//     const result = await User.findByIdAndDelete(id);
//     if (!result) {
//       response.status(404).json({ message: 'User not find' });
//     }
//     return response.status(200).send({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.log(error.massege);
//     response.status(500).send({ message: error.message });
//   }
// };
