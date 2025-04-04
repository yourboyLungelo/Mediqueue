const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Login User
router.post('/login', async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findOne({ id });
        
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Generate token (you may want to use JWT or other auth method)
        const token = `user-${user.id}-${Date.now()}`;

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});

// Register User
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ 
            success: true,
            message: 'User registered successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Logout User
router.post('/logout', (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'Logged out successfully' 
    });
});

module.exports = router;
