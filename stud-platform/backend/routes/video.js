// backend/routes/video.js
const express = require("express");
const OpenAI = require("openai");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Multer setup for video uploads
const upload = multer({ dest: "uploads/" });

// Upload video & get transcript
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1",
    });

    // delete uploaded file after transcription
    fs.unlinkSync(req.file.path);

    res.json({ transcript: transcription.text });
  } catch (err) {
    console.error("Video upload/transcription error:", err);
    res.status(500).json({ error: "Transcription failed" });
  }
});

// Generate summarized notes
router.post("/process", async (req, res) => {
  try {
    const { videoText, subjectType } = req.body;

    let prompt = "";
    if (subjectType === "subject") {
      prompt = `Please summarize the following educational video content into organized bullet points with key concepts:\n\n${videoText}`;
    } else {
      prompt = `Please summarize the following video content into well-structured paragraphs for literature or history:\n\n${videoText}`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-3.5-turbo"
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.3,
    });

    res.json({ notes: completion.choices[0].message.content });
  } catch (error) {
    console.error("Video notes error:", error);
    res.status(500).json({ message: "Error processing video notes" });
  }
});

module.exports = router;
