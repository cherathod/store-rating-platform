const jwt = require('jsonwebtoken');


const ACCESS_EXP = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_EXP = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';


function signAccess(user) {
return jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXP });
}
function signRefresh(user) {
return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXP });
}


module.exports = { signAccess, signRefresh };