const bcrypt = require("bcryptjs");
const { User } = require("../models");

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.createUser = async (req, res) => {
    const { name, email, password, address, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name, email, role,
        address,
        password: hashed
    });

    res.json(newUser);
};

exports.updatePassword = async (req, res) => {
    const { password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await User.update({ password: hashed }, { where: { id: req.user.id } });

    res.json({ message: "Password updated" });
};
