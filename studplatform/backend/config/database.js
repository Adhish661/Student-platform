// backend/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stud-platform');
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Please make sure MongoDB is running or check your connection string');
    // Don't exit the process, let the app continue without DB for now
  }
};

module.exports = connectDB;