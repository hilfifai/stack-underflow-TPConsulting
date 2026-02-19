const { prisma } = require('../config/database');

class QuestionRepository {
  async create(data) {
    return prisma.question.create({ data });
  }

  async findAll(options = {}) {
    const { orderBy = { createdAt: 'desc' }, include = { comments: true } } = options;
    return prisma.question.findMany({ orderBy, include });
  }

  async findPaginated(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [questions, total] = await prisma.$transaction([
      prisma.question.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { comments: true }
      }),
      prisma.question.count()
    ]);
    return { questions, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async search(query) {
    return prisma.question.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      },
      orderBy: { createdAt: 'desc' },
      include: { comments: true }
    });
  }

  async findHot(limit = 5) {
    return prisma.question.findMany({
      take: limit,
      orderBy: [
        { comments: { _count: 'desc' } },
        { createdAt: 'desc' }
      ],
      include: { comments: true }
    });
  }

  async findById(id) {
    return prisma.question.findUnique({
      where: { id },
      include: { comments: true }
    });
  }

  async findRelated(id, limit = 5) {
    return prisma.question.findMany({
      where: { id: { not: id } },
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id, data) {
    return prisma.question.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return prisma.question.delete({ where: { id } });
  }
}

module.exports = new QuestionRepository();
