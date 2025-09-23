import { useState, useRef } from "react";
import { FaUpload, FaFilePdf, FaDownload, FaTrash, FaPlus } from "react-icons/fa";

const subjects = ["Math", "Physics", "Chemistry", "English", "Computer Science"];

const glass = "bg-white/60 backdrop-blur-md border border-white/40";

export default function Resources() {
  const [pdfFiles, setPdfFiles] = useState({
    Math: [], Physics: [], Chemistry: [], English: [], "Computer Science": []
  });
  const [selectedSubject, setSelectedSubject] = useState("Math");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newFiles = files.map(f => ({ id: Date.now() + Math.random(), name: f.name, file: f }));

    setPdfFiles(prev => ({ ...prev, [selectedSubject]: [...prev[selectedSubject], ...newFiles] }));
  };

  const triggerUpload = () => fileInputRef.current.click();

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file.file);
    const a = document.createElement("a");
    a.href = url; a.download = file.name; a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = (fileId) => {
    setPdfFiles(prev => ({ ...prev, [selectedSubject]: prev[selectedSubject].filter(f => f.id !== fileId) }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Learning Resources</h1>
          <p className="text-gray-700">Organize and access your study materials with ease</p>
        </div>

        {/* Subject Selector */}
        <div className="flex justify-center mb-10">
          <div className={`flex flex-wrap gap-2 p-2 rounded-xl ${glass}`}>
            {subjects.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSubject === sub ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-white/70'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Upload */}
        <div className="text-center mb-10">
          <input ref={fileInputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={handleFileChange} />
          <button onClick={triggerUpload} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
            <FaUpload /> Upload PDFs for {selectedSubject}
          </button>
        </div>

        {/* Files Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfFiles[selectedSubject].length === 0 ? (
            <div className="col-span-full">
              <div className={`text-center py-16 px-8 rounded-2xl border border-dashed border-gray-300 ${glass}`}>
                <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaPlus />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No files yet</h3>
                <p className="text-gray-700 mb-4">Upload your first PDF for {selectedSubject} to get started</p>
                <button onClick={triggerUpload} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                  <FaPlus /> Add Files
                </button>
              </div>
            </div>
          ) : (
            pdfFiles[selectedSubject].map((file) => (
              <div key={file.id} className={`p-5 rounded-xl ${glass}`}>
                <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-3">
                  <FaFilePdf />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{file.name}</h3>
                <p className="text-sm text-gray-700 mb-4">{selectedSubject} • PDF Document</p>
                <div className="flex gap-2">
                  <button onClick={() => handleDownload(file)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                    <FaDownload /> Download
                  </button>
                  <button onClick={() => handleDelete(file.id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}