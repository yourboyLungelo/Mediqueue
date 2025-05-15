const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    staffID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String },
    phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'admin' });

module.exports = mongoose.model('Admin', adminSchema);
