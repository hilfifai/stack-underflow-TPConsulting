require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { prisma } = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const questionRoutes = require('./routes/question.routes');
const commentRoutes = require('./routes/comment.routes');
const { errorHandler } = require('./middleware/error.middleware');
const { authMiddleware } = require('./middleware/auth.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Make prisma available to all routes
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/questions', authMiddleware, questionRoutes);
app.use('/api/v1/comments', authMiddleware, commentRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
