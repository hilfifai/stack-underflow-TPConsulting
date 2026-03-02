const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');
const { createQuestionDto, updateQuestionDto, searchQuestionDto, paginatedQuestionDto } = require('../dto/question.dto');
const { validationResult } = require('express-validator');

// Create Question
router.post('/', createQuestionDto, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  questionController.create(req, res, next);
});

// Get All Questions
router.get('/', questionController.getAll.bind(questionController));

// Get Questions Paginated
router.get('/paginated', paginatedQuestionDto, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  questionController.getPaginated(req, res, next);
});

// Search Questions
router.get('/search', searchQuestionDto, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  questionController.search(req, res, next);
});

// Get Hot Questions
router.get('/hot', questionController.getHot.bind(questionController));

// Get Question By ID
router.get('/:id', questionController.getById.bind(questionController));

// Get Related Questions
router.get('/:id/related', questionController.getRelated.bind(questionController));

// Update Question
router.put('/:id', updateQuestionDto, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  questionController.update(req, res, next);
});

// Delete Question
router.delete('/:id', questionController.delete.bind(questionController));

module.exports = router;
