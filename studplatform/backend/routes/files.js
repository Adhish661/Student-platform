// backend/routes/files.js
const express = require('express');
const File = require('../models/File');
const upload = require('../middleware/upload'); // your existing middleware
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Upload multiple files with a subject
router.post('/upload', upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const { subject } = req.body;

    const files = req.files.map(f => ({
      filename: f.filename,
      originalName: f.originalname,
      path: f.path,
      size: f.size,
      type: f.mimetype,
      subject: subject || 'General'
    }));

    const savedFiles = await File.insertMany(files);
    res.json({ message: 'Files uploaded successfully', files: savedFiles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all files or files by subject
router.get('/', async (req, res) => {
  try {
    const { subject } = req.query;
    let query = {};
    if (subject) query.subject = subject;

    const files = await File.find(query).sort({ uploadedAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download a file
router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    res.download(path.resolve(file.path), file.originalName);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a file
router.delete('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

    await File.findByIdAndDelete(req.params.id);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
