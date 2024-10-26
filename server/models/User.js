const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [String],  // To store multiple JWT tokens for multi-device login
});

module.exports = mongoose.model('User', userSchema);
