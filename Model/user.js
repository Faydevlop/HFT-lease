// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    default:'username'
  
  },
  email: {
    type: String,
    required: true,
    
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
