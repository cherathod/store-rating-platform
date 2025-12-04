const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

/**
 * Hash a plain text password
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a password with a hashed version
 */
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
