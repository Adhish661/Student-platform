import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaVideo, FaFileUpload, FaSpinner, FaDownload, FaClipboard, FaSave, FaTrash } from "react-icons/fa";

export default function VideoNotes() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoText, setVideoText] = useState("");
  const [subjectType, setSubjectType] = useState("subject");
  const [loading, setLoading] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [showSavedNotes, setShowSavedNotes] = useState(false);
  const fileInputRef = useRef(null);

  const subjectOptions = [
    { value: "subject", label: "General (Bullet Points)" },
    { value: "math", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "history", label: "History" },
    { value: "literature", label: "Literature" },
    { value: "programming", label: "Programming" }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
      setNotes("");
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleTranscribe = () => {
    if (!videoFile) return alert("Please select a video file first");
    setTranscribing(true); setLoading(true);
    setTimeout(() => {
      const filename = videoFile.name.toLowerCase();
      let simulatedTranscript = filename.includes("math") ? "Linear and Quadratic equations..." :
                               filename.includes("physics") ? "Newton's laws..." :
                               filename.includes("program") ? "Python functions explained..." :
                               "Educational concepts overview...";
      setVideoText(simulatedTranscript);
      setTranscribing(false); setLoading(false);
    }, 2500);
  };

  const handleGenerateNotes = () => {
    if (!videoText.trim()) return alert("Transcript is empty!");
    setGenerating(true); setLoading(true);
    setTimeout(() => {
      let generatedNotes = `# Notes for ${subjectType}\n\n- Point 1\n- Point 2\n- Point 3\n`;
      setNotes(generatedNotes);
      setGenerating(false); setLoading(false);
    }, 2000);
  };

  const handleSaveNotes = () => {
    if (!notes.trim()) return;
    const newNote = { id: Date.now(), title: videoFile?.name || "Untitled Notes", content: notes, date: new Date().toLocaleDateString(), subject: subjectOptions.find(opt => opt.value === subjectType)?.label };
    setSavedNotes([...savedNotes, newNote]);
    alert("Notes saved successfully!");
  };

  const handleDeleteNote = (id) => setSavedNotes(savedNotes.filter(note => note.id !== id));
  const handleCopyNotes = () => { navigator.clipboard.writeText(notes); alert("Notes copied!"); };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">🎬 Video Note Generator</h1>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowSavedNotes(!showSavedNotes)} className="px-5 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow hover:shadow-lg transition-all">
          {showSavedNotes ? "Back to Generator" : "View Saved Notes"}
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {showSavedNotes ? (
          <motion.div key="saved-notes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-y-auto p-6 space-y-6">
            <h2 className="text-3xl font-bold text-gray-700 border-b-2 pb-2 mb-4">📂 Saved Notes</h2>
            {savedNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 border-2 border-dashed rounded-xl bg-gray-100 p-10">
                <FaClipboard className="text-6xl mb-4" />
                <p className="text-lg">No saved notes yet!</p>
                <p className="mt-2 text-sm">Generate and save some notes to see them here</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {savedNotes.map(note => (
                  <motion.div key={note.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border-l-4 border-blue-400 p-5 rounded-xl shadow-md hover:shadow-xl transition-all flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{note.title}</h3>
                          <p className="text-sm text-gray-600">{note.subject} • {note.date}</p>
                        </div>
                        <button onClick={() => handleDeleteNote(note.id)} className="text-red-500 hover:text-red-700 text-lg"><FaTrash /></button>
                      </div>
                      <p className="text-gray-700 mb-3 line-clamp-6">{note.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div key="generator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex overflow-hidden p-6 space-x-6">
            {/* Left Column - Video Upload */}
            <div className="flex-1 flex flex-col space-y-6 overflow-y-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-2xl p-6 border-2 border-purple-300 flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-purple-700 mb-2">🎥 Upload Video</h2>
                <p className="text-sm text-purple-600 mb-4">Upload an educational video for notes generation</p>

                <input ref={fileInputRef} type="file" onChange={handleFileChange} accept="video/*" className="hidden" />
                <div onClick={triggerFileInput} className="cursor-pointer border-2 border-dashed border-purple-300 rounded-xl py-12 flex flex-col items-center justify-center hover:bg-purple-100 transition-all flex-shrink-0">
                  <FaVideo className="text-6xl text-purple-500 mb-4" />
                  <p className="text-lg font-semibold text-purple-700">Click to Upload Video</p>
                  <p className="text-sm text-purple-600">MP4, MOV, or AVI</p>
                </div>

                {videoUrl && (
                  <div className="mt-4 rounded-xl overflow-hidden shadow-lg border border-purple-200 flex-1">
                    <video src={videoUrl} controls className="w-full h-full object-cover rounded-xl" />
                    <p className="text-sm text-gray-600 mt-2 truncate">{videoFile?.name}</p>
                  </div>
                )}

                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTranscribe} disabled={!videoFile || loading} className={`mt-4 w-full py-3 rounded-lg flex items-center justify-center font-semibold text-white ${!videoFile || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all'}`}>
                  {transcribing ? <><FaSpinner className="animate-spin mr-2" />Transcribing...</> : <><FaFileUpload className="mr-2" />Transcribe Video</>}
                </motion.button>

                {/* Transcript */}
                <div className="mt-6 flex-1 flex flex-col bg-white rounded-xl shadow-inner p-4 overflow-y-auto border">
                  <h3 className="font-semibold text-gray-700 mb-2">Transcript</h3>
                  <textarea value={videoText} onChange={(e) => setVideoText(e.target.value)} className="w-full h-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 resize-none flex-1" placeholder="Transcript will appear here..." />
                </div>
              </motion.div>
            </div>

            {/* Right Column - Notes Generation */}
            <div className="flex-1 flex flex-col space-y-6 overflow-y-auto">
              <motion.div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-2xl p-6 border-l-4 border-blue-400 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-blue-700 mb-2">📝 Generate Notes</h2>
                <p className="text-sm text-blue-600 mb-4">Convert transcript into structured notes</p>
                <select value={subjectType} onChange={(e) => setSubjectType(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent mb-4">
                  {subjectOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleGenerateNotes} disabled={!videoText.trim() || loading} className={`w-full py-3 rounded-lg flex items-center justify-center font-semibold text-white ${!videoText.trim() || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all'}`}>
                  {generating ? <><FaSpinner className="animate-spin mr-2" />Generating...</> : <>Generate Smart Notes</>}
                </motion.button>

                <div className="mt-6 flex-1 flex flex-col bg-white rounded-xl shadow-inner overflow-y-auto border">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-semibold text-gray-700">Generated Notes</h3>
                    {notes && (
                      <div className="flex space-x-2">
                        <motion.button whileHover={{ scale: 1.1 }} onClick={handleCopyNotes} className="text-blue-600 hover:text-blue-800"><FaClipboard /></motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} onClick={handleSaveNotes} className="text-green-600 hover:text-green-800"><FaSave /></motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} className="text-purple-600 hover:text-purple-800"><FaDownload /></motion.button>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 overflow-y-auto prose max-w-none whitespace-pre-line">
                    {notes ? notes : <p className="text-gray-400 text-center mt-10">Your generated notes will appear here</p>}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
