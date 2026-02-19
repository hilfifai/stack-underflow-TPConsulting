const questionRepository = require('../repositories/question.repository');

class QuestionService {
  async create(data) {
    return questionRepository.create(data);
  }

  async getAll() {
    return questionRepository.findAll();
  }

  async getPaginated(page, limit) {
    return questionRepository.findPaginated(page, limit);
  }

  async search(query) {
    if (!query) {
      throw new Error('Search query is required');
    }
    return questionRepository.search(query);
  }

  async getHot(limit) {
    return questionRepository.findHot(limit);
  }

  async getById(id) {
    const question = await questionRepository.findById(id);
    if (!question) {
      throw new Error('Question not found');
    }
    return question;
  }

  async getRelated(id, limit) {
    return questionRepository.findRelated(id, limit);
  }

  async update(id, data, userId) {
    const existing = await questionRepository.findById(id);
    if (!existing) {
      throw new Error('Question not found');
    }

    if (existing.userId !== userId) {
      throw new Error('You can only edit your own questions');
    }

    return questionRepository.update(id, data);
  }

  async delete(id, userId) {
    const existing = await questionRepository.findById(id);
    if (!existing) {
      throw new Error('Question not found');
    }

    if (existing.userId !== userId) {
      throw new Error('You can only delete your own questions');
    }

    return questionRepository.delete(id);
  }
}

module.exports = new QuestionService();
