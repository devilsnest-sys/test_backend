const AuthService = require('../services/auth.service');
const { validationResult } = require('express-validator');
const logger = require('../config/logger');

class AuthController {
  static async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validation failed during registration', { 
        errors: errors.array(),
        body: req.body 
      });
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      const result = await AuthService.register(username, email, password);
      
      logger.info('User registered successfully', { 
        userId: result.userId,
        email: email 
      });
      
      res.status(201).json(result);
    } catch (error) {
      logger.error('Registration failed', { 
        error: error.message,
        email: email 
      });
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validation failed during login', { 
        errors: errors.array(),
        body: req.body 
      });
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const result = await AuthService.login(email, password);
      
      logger.info('User logged in successfully', { 
        userId: result.userId,
        email: email 
      });
      
      res.json(result);
    } catch (error) {
      logger.error('Login failed', { 
        error: error.message,
        email: email 
      });
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;