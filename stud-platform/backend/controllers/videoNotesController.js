// backend/controllers/videoNotesController.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const processNotes = async (req, res) => {
  try {
    const { videoText, subjectType } = req.body;

    let prompt = "";
    if (subjectType === "subject") {
      prompt = `Summarize this educational video into organized bullet points:\n\n${videoText}`;
    } else {
      prompt = `Summarize this content into well-structured paragraphs:\n\n${videoText}`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.3,
    });

    res.json({ notes: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating notes" });
  }
};
