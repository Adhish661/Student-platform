// frontend/src/components/UI/FileUpload.jsx
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ onFileSelect, accept = '*', disabled = false }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (!disabled) {
      inputRef.current.click();
    }
  };

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
      e.target.value = null; // reset input
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition`}
      >
        <Upload size={20} />
        Upload File
      </button>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={accept}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

export default FileUpload;