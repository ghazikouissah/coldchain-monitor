const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const AppError = require("../utils/AppError");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.create({ name, email, password, role });
        const token = signToken(user._id);
        res.status(201).json({ message: "user created", token });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res,next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return next (new AppError("email ou mot de passe incorrect", 401));
        }
        const token = signToken(user._id);
        res.status(200).json({ message: "logged in", token });
    } catch (error) {
        next(error)
        }
};