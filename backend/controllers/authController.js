const bcrypt = require("bcryptjs");
const { User } = require("../models");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
    const { name, email, password, address } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, email, address,
        password: hashed,
        role: "user"
    });

    res.json({ message: "User registered", user });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(403).json({ message: "Invalid credentials" });

    const token = generateToken(user.id, user.role);

    res.json({ token, user });
};
