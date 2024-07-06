const User = require('../models/User');
const argon2 = require('argon2');

exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: `User already exists`
            });
        }

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const hashedPassword = await argon2.hash(password);

        try {
            const newUser = new User({
                username,
                email,
                password: hashedPassword
            });

            await newUser.save();

            res.status(201).json({
                success: true,
                message: `User registered successfully`,
                user: newUser
            });
        }
        catch (error) {
            // Handle specific database errors (e.g., duplicate key errors)
            if (error.code && error.code === 11000) { // Common code for duplicate key errors in MongoDB
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists', // More specific message
                });
            } else {
                // Handle other errors
                console.error(error); // Log the actual error for debugging
                return res.status(500).json({
                    success: false,
                    message: 'An error occurred during registration. Please try again later.',
                });
            }
        }
    } catch (error) {
        console.error(error); // Log the actual error for debugging
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
        });
    }
}
