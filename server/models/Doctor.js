const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  staffID: { type: String, required: true, unique: true },
  hospitalName: { type: String, required: true },
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doctor', doctorSchema);
