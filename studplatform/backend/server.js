const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// Database connection
const connectDB = require('./config/database');
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/files', require('./routes/files'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/video', require('./routes/video')); // <-- updated video routes

// Socket.io for real-time communication & WebRTC signaling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    // Notify others in the room
    socket.to(roomId).emit('user-connected', socket.id);
  });

  // Forward WebRTC offer/answer/candidates within the room
  socket.on('webrtc-offer', ({ roomId, offer, to }) => {
    if (to) {
      io.to(to).emit('webrtc-offer', { from: socket.id, offer });
    } else if (roomId) {
      socket.to(roomId).emit('webrtc-offer', { from: socket.id, offer });
    }
  });

  socket.on('webrtc-answer', ({ roomId, answer, to }) => {
    if (to) {
      io.to(to).emit('webrtc-answer', { from: socket.id, answer });
    } else if (roomId) {
      socket.to(roomId).emit('webrtc-answer', { from: socket.id, answer });
    }
  });

  socket.on('webrtc-ice-candidate', ({ roomId, candidate, to }) => {
    if (to) {
      io.to(to).emit('webrtc-ice-candidate', { from: socket.id, candidate });
    } else if (roomId) {
      socket.to(roomId).emit('webrtc-ice-candidate', { from: socket.id, candidate });
    }
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    socket.to(roomId).emit('user-disconnected', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Optionally broadcast to all rooms this socket was in
    // Not tracking rooms per-socket here; clients should emit leave-room before disconnect
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
