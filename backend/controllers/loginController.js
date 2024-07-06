const User = require('../models/User');
const argon2 = require('argon2');

exports.loginController = async(req, res) => {
    try {
        const { email, password } = req.body;
    
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
    
        // Verify the password
        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
    
        res.status(200).json({
            success: true,
            message: `Login successful`,
            user
        });
      } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};