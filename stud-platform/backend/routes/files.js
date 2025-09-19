// backend/routes/files.js
const express = require('express');
const File = require('../models/File');
const upload = require('../middleware/upload');
const router = express.Router();

// Upload file
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      type: req.file.mimetype
    });

    await file.save();
    res.json({ message: 'File uploaded successfully', file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all files
router.get('/', async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete file
router.delete('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fs = require('fs');
    fs.unlinkSync(file.path);
    
    await File.findByIdAndDelete(req.params.id);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;