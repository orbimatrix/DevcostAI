import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, EstimationResult } from '../types';
import { sendFollowUpChat } from '../services/geminiService';

interface ChatInterfaceProps {
  result: EstimationResult;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ result }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setLoading(true);

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    try {
      // Convert history for API
      const historyForApi = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await sendFollowUpChat(historyForApi, userMsg, result);

      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error answering that." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col h-[600px]">
      <div className="bg-[#1e1b4b] p-4">
        <h3 className="text-white font-bold flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          Ask about this Estimate
        </h3>
        <p className="text-indigo-200 text-xs">Powered by Gemini 3 Pro</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10 px-4">
            <p className="mb-4">I can explain the cost breakdown or adjust assumptions.</p>
            <p className="text-xs uppercase font-semibold text-gray-300 mb-2">Try asking:</p>
            <ul className="text-sm space-y-2">
              <li className="bg-white border border-gray-200 p-2 rounded cursor-pointer hover:bg-indigo-50" onClick={() => setInput("Why is the backend cost so high?")}>"Why is the backend cost so high?"</li>
              <li className="bg-white border border-gray-200 p-2 rounded cursor-pointer hover:bg-indigo-50" onClick={() => setInput("How can we reduce the timeline?")}>"How can we reduce the timeline?"</li>
              <li className="bg-white border border-gray-200 p-2 rounded cursor-pointer hover:bg-indigo-50" onClick={() => setInput("Compare this to developers in Vietnam.")}>"Compare this to developers in Vietnam."</li>
            </ul>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-[#312e81] text-white rounded-br-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
           <div className="flex justify-start">
             <div className="bg-white rounded-2xl p-4 rounded-bl-none shadow-sm border border-gray-100">
               <div className="flex space-x-1">
                 <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                 <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
               </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#312e81] focus:border-[#312e81] outline-none transition-all text-sm"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-[#312e81] text-white px-5 py-2 rounded-full hover:bg-[#1e1b4b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;