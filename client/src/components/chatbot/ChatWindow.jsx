import React, { useState, useEffect, useRef } from 'react';
import { IoClose, IoSend, IoChevronDown } from 'react-icons/io5';
import { BsRobot } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import api from '../../services/api';
import BWLogo from '../../assets/Logo/BitWisdom_Secondary_Logomark_Registered.png';

const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! 👋 Welcome to BitWisdom. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quickReplies, setQuickReplies] = useState([]);
  const [showFAQ, setShowFAQ] = useState(false);
  const [faqs, setFaqs] = useState({});
  const messagesEndRef = useRef(null);
  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load quick replies when chat opens
  useEffect(() => {
    if (isOpen) {
      loadQuickReplies();
    }
  }, [isOpen]);

  const loadQuickReplies = async () => {
    try {
      const response = await api.get('/chatbot/quick-replies');
      if (response.data.success) {
        setQuickReplies(response.data.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to load quick replies:', error);
    }
  };

  const loadFAQs = async () => {
    try {
      const response = await api.get('/chatbot/faqs');
      if (response.data.success) {
        setFaqs(response.data.data);
        setShowFAQ(true);
      }
    } catch (error) {
      console.error('Failed to load FAQs:', error);
    }
  };

  const sendMessage = async (content) => {
    if (!content.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await api.post('/chatbot/message', {
        message: content.trim(),
        sessionId: sessionId.current,
        conversationHistory: messages.slice(-10),
      });

      if (response.data.success) {
        const assistantMessage = {
          role: 'assistant',
          content: response.data.data.message,
          timestamp: new Date(),
          sources: response.data.data.sources,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again.",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickReplyClick = (reply) => {
    sendMessage(reply);
  };

  const handleFAQClick = (question) => {
    sendMessage(question);
    setShowFAQ(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(135deg, #00ecff 0%, #0080fa 100%)',
        }}
      >
        <div className="flex items-center gap-3">
          <img src={BWLogo} alt="BitWisdom" className="w-10 h-10 object-contain" />
          <div>
            <h3 className="text-white font-semibold text-lg">BitWisdom AI</h3>
            <p className="text-white/80 text-xs">Always here to help</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          aria-label="Close chat"
        >
          <IoClose className="w-6 h-6" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-500'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}
            >
              {message.role === 'user' ? (
                <BiUser className="w-5 h-5 text-white" />
              ) : (
                <BsRobot className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[75%] rounded-2xl p-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white'
                  : message.isError
                  ? 'bg-red-100 text-red-900'
                  : 'bg-white text-gray-800 shadow-sm'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
              {message.sources && (
                <p className="text-xs mt-2 opacity-70">
                  {message.sources.faqs && '📚 FAQ'}
                  {message.sources.faqs && message.sources.website && ' • '}
                  {message.sources.website && '🌐 Website'}
                </p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <BsRobot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white rounded-2xl p-3 shadow-sm">
              <AiOutlineLoading3Quarters className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {quickReplies.length > 0 && messages.length <= 2 && (
        <div className="px-4 py-2 bg-white border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReplyClick(reply)}
                className="text-xs px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:shadow-md transition-all"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Toggle */}
      <div className="px-4 py-2 bg-white border-t border-gray-200">
        <button
          onClick={() => (showFAQ ? setShowFAQ(false) : loadFAQs())}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          {showFAQ ? 'Hide FAQs' : 'View FAQs'}
          <IoChevronDown
            className={`w-4 h-4 transition-transform ${showFAQ ? 'rotate-180' : ''}`}
          />
        </button>

        {showFAQ && (
          <div className="mt-2 max-h-32 overflow-y-auto space-y-1">
            {Object.entries(faqs).map(([category, questions]) => (
              <div key={category}>
                <p className="text-xs font-semibold text-gray-600 mt-2 mb-1">{category}</p>
                {questions.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(faq.question)}
                    className="block w-full text-left text-xs text-gray-700 hover:text-blue-600 py-1 px-2 hover:bg-blue-50 rounded"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            <IoSend className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
