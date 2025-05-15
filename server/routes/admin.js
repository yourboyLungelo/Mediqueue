const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Nurse = require('../models/Nurse');
const User = require('../models/User'); // For patients

// Middleware to check admin authentication (simplified)
const adminAuth = (req, res, next) => {
  // In real app, verify token and admin role
  next();
};

// Doctor CRUD routes
router.get('/doctors', adminAuth, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/doctors', adminAuth, async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/doctors/:id', adminAuth, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/doctors/:id', adminAuth, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Nurse CRUD routes
router.get('/nurses', adminAuth, async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.json(nurses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/nurses', adminAuth, async (req, res) => {
  try {
    const nurse = new Nurse(req.body);
    await nurse.save();
    res.status(201).json(nurse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/nurses/:id', adminAuth, async (req, res) => {
  try {
    const nurse = await Nurse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!nurse) return res.status(404).json({ error: 'Nurse not found' });
    res.json(nurse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/nurses/:id', adminAuth, async (req, res) => {
  try {
    const nurse = await Nurse.findByIdAndDelete(req.params.id);
    if (!nurse) return res.status(404).json({ error: 'Nurse not found' });
    res.json({ message: 'Nurse deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Patients list route (read only)
router.get('/patients', adminAuth, async (req, res) => {
  try {
    const patients = await User.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Real-time analytics route (dummy data for now)
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    // Example analytics data
    const totalRegistrations = await User.countDocuments();
    const activeUsers = 42; // Placeholder, implement real logic
    res.json({ totalRegistrations, activeUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
