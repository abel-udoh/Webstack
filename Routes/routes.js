// routes.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserController = require('./controllers/UserController');


router.get('/', (req, res) => {
  res.send('Welcome to the user authentication system!');
});

router.post('/register', [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], UserController.register);

router.post('/login', UserController.login);

router.get('/dashboard', UserController.dashboard);

router.get('/logout', UserController.logout);

module.exports = router;
