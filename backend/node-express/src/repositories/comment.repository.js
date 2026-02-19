const { prisma } = require('../config/database');

class CommentRepository {
  async create(data) {
    return prisma.comment.create({ data });
  }

  async findByQuestionId(questionId) {
    return prisma.comment.findMany({
      where: { questionId },
      orderBy: { createdAt: 'asc' }
    });
  }

  async delete(id) {
    return prisma.comment.delete({ where: { id } });
  }
}

module.exports = new CommentRepository();
