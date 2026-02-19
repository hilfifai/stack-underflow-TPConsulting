const { body } = require('express-validator');

const createCommentDto = [
  body('content').isLength({ min: 1 }).withMessage('Content is required'),
  body('questionId').notEmpty().withMessage('Question ID is required')
];

module.exports = { createCommentDto };
