const { prisma } = require('../config/database');

class UserRepository {
  async findByUsername(username) {
    return prisma.user.findUnique({ where: { username } });
  }

  async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data) {
    return prisma.user.create({ data });
  }
}

module.exports = new UserRepository();
