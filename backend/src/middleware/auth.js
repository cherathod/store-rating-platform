const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
const header = req.headers.authorization;
if (!header) return res.status(401).json({ message: 'Missing Authorization header' });
const token = header.split(' ')[1];
if (!token) return res.status(401).json({ message: 'Missing token' });
try {
const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
req.user = { id: payload.id, role: payload.role, email: payload.email };
next();
} catch (err) {
return res.status(401).json({ message: 'Invalid or expired token' });
}
}


module.exports = { authenticate };