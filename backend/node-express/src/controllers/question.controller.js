const questionService = require('../services/question.service');

class QuestionController {
  async create(req, res, next) {
    try {
      const { title, description, status = 'OPEN' } = req.body;
      const userId = req.user.userId;

      const question = await questionService.create({
        title,
        description,
        status,
        userId,
        username: req.user.username
      });

      res.status(201).json({
        success: true,
        message: 'Question created successfully',
        data: question
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const questions = await questionService.getAll();
      res.json({
        success: true,
        message: 'Success get all questions',
        data: questions
      });
    } catch (error) {
      next(error);
    }
  }

  async getPaginated(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await questionService.getPaginated(page, limit);
      res.json({
        success: true,
        message: 'Success get questions',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const { q } = req.query;
      const questions = await questionService.search(q);
      res.json({
        success: true,
        message: 'Success search questions',
        data: questions
      });
    } catch (error) {
      next(error);
    }
  }

  async getHot(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const questions = await questionService.getHot(limit);
      res.json({
        success: true,
        message: 'Success get hot questions',
        data: questions
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const question = await questionService.getById(id);
      res.json({
        success: true,
        message: 'Success get question',
        data: question
      });
    } catch (error) {
      next(error);
    }
  }

  async getRelated(req, res, next) {
    try {
      const { id } = req.params;
      const limit = parseInt(req.query.limit) || 5;
      const questions = await questionService.getRelated(id, limit);
      res.json({
        success: true,
        message: 'Success get related questions',
        data: questions
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const userId = req.user.userId;

      const question = await questionService.update(id, { title, description, status }, userId);
      res.json({
        success: true,
        message: 'Question updated successfully',
        data: question
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      await questionService.delete(id, userId);
      res.json({
        success: true,
        message: 'Question deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QuestionController();
