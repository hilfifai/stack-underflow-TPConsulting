const { body, query } = require('express-validator');

const createQuestionDto = [
  body('title').isLength({ min: 5, max: 500 }).withMessage('Title must be 5-500 characters'),
  body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('status').optional().isIn(['OPEN', 'ANSWERED', 'CLOSED']).withMessage('Invalid status')
];

const updateQuestionDto = [
  body('title').isLength({ min: 5, max: 500 }).withMessage('Title must be 5-500 characters'),
  body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('status').isIn(['OPEN', 'ANSWERED', 'CLOSED']).withMessage('Invalid status')
];

const searchQuestionDto = [
  query('q').notEmpty().withMessage('Search query is required')
];

const paginatedQuestionDto = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];

module.exports = { createQuestionDto, updateQuestionDto, searchQuestionDto, paginatedQuestionDto };
