const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const { createCommentDto } = require('../dto/comment.dto');
const { validationResult } = require('express-validator');

// Create Comment
router.post('/', createCommentDto, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  commentController.create(req, res, next);
});

// Get Comments by Question ID
router.get('/question/:questionId', commentController.getByQuestionId.bind(commentController));

// Delete Comment
router.delete('/:id', commentController.delete.bind(commentController));

module.exports = router;
