const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.create({ name, email, password, role });
        const token = signToken(user._id);
        res.status(201).json({ message: "user created", token });
    } catch (error) {
        res.status(400).json({ message: "fail", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "email ou mot de passe incorrect" });
        }
        const token = signToken(user._id);
        res.status(200).json({ message: "logged in", token });
    } catch (error) {
        res.status(400).json({ message: "fail", error: error.message });
    }
};