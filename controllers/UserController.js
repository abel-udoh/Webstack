const { insertUser, findUserByEmail } = require('../models/Users');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { closeDatabaseConnection } = require('../db');

const UserController = {
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await insertUser(email, hashedPassword);
      res.send('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await findUserByEmail(email);

      if (!user) {
        return res.send('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        res.send('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  dashboard: (req, res) => {
    if (req.session.user) {
      res.send('Welcome to the dashboard');
    } else {
      res.redirect('/login');
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  }
};

module.exports = UserController;
