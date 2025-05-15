const express = require('express');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Doctor = require('../models/Doctor');
const Nurse = require('../models/Nurse');
const router = express.Router();
const bcrypt = require('bcrypt');


// Admin login route
router.post('/admin-login', async (req, res) => {
    const { role, id, password } = req.body;
  
    try {
      let userModel;
      if (role === 'admin') {
        userModel = Admin;
      } else if (role === 'doctor') {
        userModel = Doctor;
      } else if (role === 'nurse') {
        userModel = Nurse;
      } else {
        return res.status(400).json({ success: false, message: 'Invalid role' });
      }
  
      const user = await userModel.findOne({ staffID: id });
      console.log(`${role} user found:`, user ? { staffID: user.staffID, name: user.name } : null);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return res.json({ success: true, message: `${role} login successful`, token: `${role}-token` });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(`${role} login error:`, error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  


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

// Update patient profile
router.put('/patient/profile', async (req, res) => {
  const { id, name, surname, email, phonenumber } = req.body;
  if (!id) {
    return res.status(400).json({ success: false, message: 'Patient ID is required' });
  }
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.email = email || user.email;
    user.phonenumber = phonenumber || user.phonenumber;
    await user.save();
    res.json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get patient profile by ID
router.get('/patient/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
