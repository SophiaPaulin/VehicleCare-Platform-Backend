const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require("../models/users.model");

module.exports.register = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send("User already exisits. Please sign in");
    } else {
        try {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: password
            });
            await user.save();
            return res.status(201).json({
                user,
                success: true,
                userId: user._id,
                message: "Registered successfully!"
            });
        } catch (err) {
            return res
                .status(500)
                .json({ success: false, message: err.message || "Internal server error" });
        }
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({
            email
        });

        bcrypt.compare(password, userData.password).then((valid) => {
            if (valid) {
                var token = jwt.sign(
                    {
                        _id: userData._id,
                        role: "basic"
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "21d"
                    }
                );
                return res.status(200).json({
                    success: true,
                    message: "Login Successfull",
                    userId: userData._id,
                    token,
                    name: userData.name
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }
        });
    } catch (error) {}
};
