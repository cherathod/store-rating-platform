const { User } = require('../models');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { signAccess, signRefresh } = require('../utils/jwt');


module.exports = {
signup: async (req, res, next) => {
try {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const { name, email, password, address } = req.body;
const exists = await User.findOne({ where: { email } });
if (exists) return res.status(409).json({ message: 'Email already registered' });


const salt = await bcrypt.genSalt(12);
const hash = await bcrypt.hash(password, salt);
const user = await User.create({ name, email, password_hash: hash, address, role: 'user' });
res.status(201).json({ id: user.id, email: user.email, role: user.role });
} catch (err) { next(err); }
},


login: async (req, res, next) => {
try {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
const { email, password } = req.body;
const user = await User.findOne({ where: { email } });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const ok = await user.validatePassword(password);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
const access = signAccess(user);
const refresh = signRefresh(user);
res.cookie('refreshToken', refresh, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
res.json({ accessToken: access, user: { id: user.id, email: user.email, role: user.role } });
} catch (err) { next(err); }
},


refresh: async (req, res, next) => {
try {
const token = req.cookies.refreshToken;
if (!token) return res.status(401).json({ message: 'Missing refresh token' });
const payload = require('jsonwebtoken').verify(token, process.env.JWT_REFRESH_SECRET);
const user = await User.findByPk(payload.id);
if (!user) return res.status(401).json({ message: 'Invalid refresh token' });
const access = signAccess(user);
res.json({ accessToken: access });
} catch (err) { return res.status(401).json({ message: 'Invalid or expired refresh token' }); }
},


logout: async (req, res, next) => {
res.clearCookie('refreshToken');
res.json({ ok: true });
}
};