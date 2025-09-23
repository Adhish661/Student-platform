// frontend/src/hooks/useVideoProcessing.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const useVideoProcessing = (apiUrl) => {
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const processVideoText = useCallback(
    async (videoText, subjectType) => {
      setIsProcessing(true);
      setError(null);

      try {
        const response = await axios.post(apiUrl, { videoText, subjectType });
        setNotes(response.data.notes);
      } catch (err) {
        setError('Failed to process video. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    },
    [apiUrl]
  );

  return { notes, processVideoText, isProcessing, error };
};

export default useVideoProcessing;