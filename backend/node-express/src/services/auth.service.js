const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

class AuthService {
  async login(username, password) {
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      access_token: token,
      user: { id: user.id, username: user.username }
    };
  }

  async getUserData(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  }

  async register(username, password) {
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({
      username,
      password: hashedPassword
    });

    return { id: user.id, username: user.username };
  }
}

module.exports = new AuthService();
