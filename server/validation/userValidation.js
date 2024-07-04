import { body } from 'express-validator';

export const userValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('fullname')
    .isLength({ min: 3 })
    .withMessage('Fullname must be at least 3 characters long'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
