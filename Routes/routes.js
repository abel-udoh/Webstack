// routes.js
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
const { check, validationResult } = require('express-validator');
const UserController = require('../controllers/UserController');


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});


router.post('/register', [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], UserController.register);

router.post('/login', UserController.login);

router.get('/dashboard', UserController.dashboard);

router.get('/logout', UserController.logout);

module.exports = router;
