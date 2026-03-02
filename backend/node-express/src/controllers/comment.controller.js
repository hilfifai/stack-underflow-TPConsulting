const commentService = require('../services/comment.service');

class CommentController {
  async create(req, res, next) {
    try {
      const { content, questionId } = req.body;
      const userId = req.user.userId;

      const comment = await commentService.create({
        content,
        questionId,
        userId,
        username: req.user.username
      });

      res.status(201).json({
        success: true,
        message: 'Comment created successfully',
        data: comment
      });
    } catch (error) {
      next(error);
    }
  }

  async getByQuestionId(req, res, next) {
    try {
      const { questionId } = req.params;
      const comments = await commentService.getByQuestionId(questionId);
      res.json({
        success: true,
        message: 'Success get comments',
        data: comments
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await commentService.delete(id);
      res.json({
        success: true,
        message: 'Comment deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
