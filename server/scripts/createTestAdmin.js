const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

mongoose.connect('mongodb://localhost:27017/mediqueue', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  const hashedPassword = await bcrypt.hash('mediconnect', 10);

  const testAdmin = new Admin({
    id: 'admin1',
    staffID: 'admin',
    name: 'Test',
    surname: 'Admin',
    email: 'admin@example.com',
    phonenumber: '0000000000',
    password: hashedPassword
  });

  try {
    await testAdmin.save();
    console.log('Test admin user created successfully');
  } catch (error) {
    console.error('Error creating test admin user:', error);
  } finally {
    mongoose.disconnect();
  }
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});
