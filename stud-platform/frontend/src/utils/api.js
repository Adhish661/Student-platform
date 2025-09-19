// frontend/src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // adjust if needed

export const uploadFile = (formData) => {
  return axios.post(`${API_BASE_URL}/files`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getFiles = (category) => {
  // category can be 'resources' or 'previous-year' or others depending on backend
  return axios.get(`${API_BASE_URL}/files?category=${category}`);
};

export const deleteFile = (fileId) => {
  return axios.delete(`${API_BASE_URL}/files/${fileId}`);
};

export const sendMessage = (message) => {
  return axios.post(`${API_BASE_URL}/chat`, { message });
};

export const processVideo = (videoText, subjectType) => {
  return axios.post(`${API_BASE_URL}/video/process`, { videoText, subjectType });
};