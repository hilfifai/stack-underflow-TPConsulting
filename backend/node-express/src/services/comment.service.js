const commentRepository = require('../repositories/comment.repository');

class CommentService {
  async create(data) {
    return commentRepository.create(data);
  }

  async getByQuestionId(questionId) {
    return commentRepository.findByQuestionId(questionId);
  }

  async delete(id) {
    return commentRepository.delete(id);
  }
}

module.exports = new CommentService();
