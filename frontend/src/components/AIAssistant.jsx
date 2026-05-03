import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import axios from 'axios';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your Election Guide AI. Ask me anything about voting, EVMs, or the election process.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { query: input });
      const botMessage = { id: Date.now() + 1, text: res.data.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = { 
        id: Date.now() + 1, 
        text: "I'm having trouble connecting to my brain right now. Make sure the backend is running and the API key is set!", 
        sender: 'bot',
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-accent-700 transition-colors z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-7 h-7" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-50 h-[500px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-600 to-accent-500 p-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Election Guide AI</h3>
                  <p className="text-xs text-accent-100 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end`}>
                    
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-primary-500 ml-2' : 'bg-accent-500 mr-2'}`}>
                      {msg.sender === 'user' ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-white" />}
                    </div>

                    <div 
                      className={`p-3 rounded-2xl text-sm shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-primary-600 text-white rounded-br-none' 
                          : msg.isError 
                            ? 'bg-red-50 text-red-600 border border-red-100 rounded-bl-none'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex flex-row items-end">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-accent-500 mr-2">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="p-3 bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-accent-500" />
                      <span className="text-xs text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
              <form onSubmit={handleSend} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about voting..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:bg-white transition-all"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-accent-600 text-white p-2.5 rounded-xl hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
