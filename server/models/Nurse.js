const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  staffID: { type: String, required: true, unique: true },
  hospitalName: { type: String, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Nurse', nurseSchema);
