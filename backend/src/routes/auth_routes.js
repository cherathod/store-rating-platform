const express = require('express');
const { validateSignup, validateLogin } = require('../utils/validators');
const authController = require('../controllers/auth.controller');


const router = express.Router();
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);


module.exports = router;