// frontend/src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // adjust if needed

export const uploadFile = (formData) => {
  return axios.post(`${API_BASE_URL}/files/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getFiles = (subject) => {
  // subject can be 'Math', 'Physics', 'Chemistry', etc.
  return axios.get(`${API_BASE_URL}/files?subject=${subject}`);
};

export const deleteFile = (fileId) => {
  return axios.delete(`${API_BASE_URL}/files/${fileId}`);
};

export const sendMessage = (message) => {
  return axios.post(`${API_BASE_URL}/chat`, { message });
};

export const uploadVideo = (formData) => {
  return axios.post(`${API_BASE_URL}/video/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const processVideo = (videoText, subjectType) => {
  return axios.post(`${API_BASE_URL}/video/process`, { videoText, subjectType });
};