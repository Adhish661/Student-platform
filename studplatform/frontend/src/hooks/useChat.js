// frontend/src/hooks/useChat.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const useChat = (apiUrl) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim()) return;

      const userMessage = { text, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await axios.post(apiUrl, { message: text });
        const botMessage = { text: response.data.response, sender: 'bot' };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { text: 'Error: Could not get response. Please try again.', sender: 'bot' },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl]
  );

  return { messages, sendMessage, isLoading };
};

export default useChat;