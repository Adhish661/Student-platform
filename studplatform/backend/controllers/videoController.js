// backend/controllers/videoController.js
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const transcribeVideo = async (filePath) => {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });

    // remove uploaded file after transcription
    fs.unlinkSync(filePath);

    return transcription.text;
  } catch (err) {
    console.error("Transcription Error:", err);
    throw err;
  }
};
