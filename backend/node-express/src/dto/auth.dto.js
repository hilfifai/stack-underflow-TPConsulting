const { body } = require('express-validator');

const loginDto = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const registerDto = [
  body('username').isLength({ min: 3, max: 50 }).withMessage('Username must be 3-50 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

module.exports = { loginDto, registerDto };
