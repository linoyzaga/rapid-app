const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const router = new Router();

// Login user
router.route('/login').post(AuthController.login);

module.exports = router;
