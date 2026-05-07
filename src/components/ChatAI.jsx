import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import api from '../services/apiService';

const ChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Chào bạn! Tôi là trợ lý ảo AI. Tôi có thể giúp gì cho bạn hôm nay?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Sử dụng instance 'api' từ apiService.js
      const res = await api.post('/Chat/ask', {
        message: input
      });
      
      const botMessage = { 
        id: Date.now() + 1, 
        text: res.data.answer || "Xin lỗi, tôi không thể trả lời lúc này.", 
        isBot: true 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Lỗi Chat AI:', error);
      const botMessage = { 
        id: Date.now() + 1, 
        text: "Hệ thống đang bận hoặc chưa nhận được API Key. Bạn hãy thử Restart lại Backend (ASP.NET) nhé!", 
        isBot: true 
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-ai-container">
      {/* Nút bong bóng chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chat-toggle-btn"
        >
          <MessageSquare size={24} />
          <span className="chat-badge"></span>
        </button>
      )}

      {/* Cửa sổ chat */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <Bot size={20} />
              </div>
              <div>
                <div style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Trợ lý AI</div>
                <div className="chat-status">
                  <span className="chat-status-dot"></span>
                  Đang trực tuyến
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}
            >
              <X size={20} />
            </button>
          </div>

          {/* Khu vực tin nhắn */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`msg-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
                <div className={`msg-avatar ${msg.isBot ? 'bot' : 'user'}`}>
                  {msg.isBot ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="msg-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="msg-wrapper bot">
                <div className="msg-avatar bot">
                  <Bot size={14} />
                </div>
                <div className="msg-bubble" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <Loader2 size={14} className="animate-spin" />
                  <span style={{fontSize: '0.75rem', color: '#64748b'}}>Đang suy nghĩ...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Ô nhập tin nhắn */}
          <form onSubmit={handleSend} className="chat-footer">
            <div className="chat-input-wrapper">
              <input
                type="text"
                placeholder="Nhập câu hỏi..."
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="chat-send-btn"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatAI;
