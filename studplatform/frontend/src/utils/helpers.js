// frontend/src/utils/helpers.js

// Format file size in MB with 2 decimals
export const formatFileSize = (sizeInBytes) => {
  return (sizeInBytes / 1024 / 1024).toFixed(2) + ' MB';
};

// Generate random room ID
export const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 10);
};

// Validate PDF file
export const isValidPDF = (file) => {
  return file.type === 'application/pdf';
};