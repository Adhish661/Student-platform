import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { sendMessage } from "../../utils/api";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm StuD Assistant. How can I help you today?", sender: "bot" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const getDemoResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    if (message.includes("math")) return "I can help with algebra, calculus, or geometry. What topic?";
    if (message.includes("physics")) return "Mechanics, thermodynamics, electromagnetism—what would you like to learn?";
    if (message.includes("study")) return "Try active recall, spaced repetition, and practice papers for best results.";
    return "I'm in demo mode. Ask about math, physics, or study tips!";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    const text = inputMessage;

    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setInputMessage("");
    setIsLoading(true);

    // typing placeholder
    setMessages((prev) => [...prev, { text: "Typing...", sender: "bot", isTyping: true }]);

    try {
      const response = await sendMessage(text);
      setMessages((prev) => prev.filter((m) => !m.isTyping));
      setMessages((prev) => [...prev, { text: response.data.response, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => prev.filter((m) => !m.isTyping));
      if (error.response?.status === 500 && error.response?.data?.message?.includes("not configured")) {
        setMessages((prev) => [...prev, { text: getDemoResponse(text), sender: "bot" }]);
      } else {
        setMessages((prev) => [...prev, { text: "Connection issue. Please try again later.", sender: "bot" }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <FaRobot />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-900">AI Study Assistant</h1>
              <p className="text-sm text-gray-600">Your intelligent learning companion</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="h-96 overflow-y-auto p-5 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse gap-2' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}`}>
                    {message.sender === 'user' ? <FaUser /> : <FaRobot />}
                  </div>
                  <div className={`${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} px-3 py-2 rounded-xl text-sm`}>
                    {message.isTyping ? <span className="text-gray-500">AI is thinking...</span> : message.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about your studies..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`px-5 py-2 rounded-lg font-semibold ${!inputMessage.trim() || isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["Help me with math","Explain physics concepts","Study tips please","Chemistry problems"].map((s) => (
            <button key={s} onClick={() => setInputMessage(s)} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}