const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { loginDto } = require('../dto/auth.dto');
const { validationResult } = require('express-validator');

// Login
router.post('/login', loginDto, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  authController.login(req, res, next);
});

// Get user info
router.get('/data', authController.getData.bind(authController));

module.exports = router;
