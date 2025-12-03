const jwt = require("jsonwebtoken");

module.exports = (id, role) => {
    return jwt.sign({ id, role }, "secretkey", { expiresIn: "7d" });
};
