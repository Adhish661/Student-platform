import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function VideoNotes() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoText, setVideoText] = useState("");
  const [subjectType, setSubjectType] = useState("subject");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");

  // 📌 Handle Video Upload
  const handleVideoUpload = async () => {
    if (!videoFile) {
      alert("Please select a video file first");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("video", videoFile);

      // send to backend for transcription
      const res = await axios.post("http://localhost:5000/api/video/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setVideoText(res.data.transcript); // auto-fill transcript
    } catch (err) {
      console.error(err);
      alert("Error transcribing video");
    }
    setLoading(false);
  };

  // 📌 Handle Notes Generation
  const handleGenerateNotes = async () => {
    if (!videoText.trim()) {
      alert("Transcript is empty! Please upload a video or paste text.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/video/process", {
        videoText,
        subjectType,
      });
      setNotes(res.data.notes);
    } catch (err) {
      console.error(err);
      alert("Error generating notes");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">🎥 Video Note Generator</h1>

      {/* Upload Section */}
      <motion.div
        className="p-4 border rounded-xl shadow-lg bg-white dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          className="mb-3"
        />
        <button
          onClick={handleVideoUpload}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          {loading ? "Transcribing..." : "Upload & Transcribe"}
        </button>
      </motion.div>

      {/* Transcript Textarea */}
      <motion.div
        className="p-4 border rounded-xl shadow-lg bg-white dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <textarea
          rows={6}
          value={videoText}
          onChange={(e) => setVideoText(e.target.value)}
          placeholder="Transcripted text will appear here..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="flex items-center justify-between mt-4">
          <select
            value={subjectType}
            onChange={(e) => setSubjectType(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="subject">Subject (bullet points)</option>
            <option value="literature">Literature/History (paragraphs)</option>
          </select>
          <button
            onClick={handleGenerateNotes}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Generating..." : "Generate Notes"}
          </button>
        </div>
      </motion.div>

      {/* Summarized Notes */}
      {notes && (
        <motion.div
          className="p-4 bg-green-50 rounded-lg shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-xl font-semibold mb-2">📑 Summarized Notes</h2>
          <p className="text-gray-800 whitespace-pre-line">{notes}</p>
        </motion.div>
      )}
    </div>
  );
}
