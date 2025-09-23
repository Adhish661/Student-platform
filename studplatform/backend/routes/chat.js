// backend/routes/chat.js
const express = require("express");
const OpenAI = require("openai");
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat with AI
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        message: "AI service is not configured. Please contact the administrator." 
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are StuD Assistant, a helpful AI tutor for students. You help with academic questions, provide study tips, explain concepts, and assist with learning. Be friendly, encouraging, and educational. Keep responses concise but informative."
        },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Chat route error:", error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(500).json({ 
        message: "AI service quota exceeded. Please try again later." 
      });
    } else if (error.code === 'invalid_api_key') {
      return res.status(500).json({ 
        message: "AI service configuration error. Please contact support." 
      });
    } else {
      return res.status(500).json({ 
        message: "Sorry, I'm having trouble processing your request. Please try again." 
      });
    }
  }
});

module.exports = router;
