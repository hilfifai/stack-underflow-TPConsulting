const authService = require('../services/auth.service');

class AuthController {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      res.json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getData(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: 'Authorization header required'
        });
      }

      const token = authHeader.split(' ')[1];
      const userData = await authService.getUserData(token);
      res.json({
        success: true,
        message: 'Success get user data',
        data: userData
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await authService.register(username, password);
      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
