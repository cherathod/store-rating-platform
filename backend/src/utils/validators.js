const { body } = require('express-validator');


const nameCheck = body('name').isString().isLength({ min: 20, max: 60 }).withMessage('Name must be 20-60 characters');
const addressCheck = body('address').optional().isLength({ max: 400 }).withMessage('Address too long');
const passwordCheck = body('password').matches(/^(?=.{8,16}$)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\|,.<>\/?]).+$/).withMessage('Password must be 8-16 chars with at least one uppercase and one special char');
const emailCheck = body('email').isEmail().withMessage('Invalid email');


const validateSignup = [ nameCheck, emailCheck, addressCheck, passwordCheck ];
const validateLogin = [ body('email').isEmail(), body('password').isString() ];


module.exports = { validateSignup, validateLogin };