const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  static async register(username, email, password) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const userId = await User.create(username, email, password);
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    return { userId, token };
  }

  static async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { userId: user.id, token };
  }
}

module.exports = AuthService;