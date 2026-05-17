"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, HelpCircle } from "lucide-react";

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: "Hi! I'm your GoalSync AI assistant. Need help setting a SMART goal, understanding the quarterly cycle, or navigating the portal?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let aiText = "I can definitely help with that. Since this is a demo, I'm currently in mock mode! ";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes("create") || lowerText.includes("goal")) {
        aiText = "To create a goal, navigate to the 'Goal Sheet' from the left sidebar. Remember, you can have a maximum of 8 goals, and your total weightage must equal exactly 100%!";
      } else if (lowerText.includes("smart")) {
        aiText = "A SMART goal is Specific, Measurable, Achievable, Relevant, and Time-bound. For example, instead of 'Increase Sales', try 'Increase Q3 Enterprise Sales by 15% before October 1st'.";
      } else if (lowerText.includes("cycle") || lowerText.includes("when")) {
        aiText = "The Goal Setting window opens in May. Check-ins occur in July (Q1), October (Q2), January (Q3), and March/April (Annual).";
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiText };
      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  const suggestions = [
    "How do I create a goal?",
    "What is a SMART goal?",
    "When is the next check-in?"
  ];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-primary text-white flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] z-40 transition-opacity ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Bot className="w-6 h-6" />
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-violet-400 animate-ping opacity-20" />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-8 right-8 w-[380px] h-[550px] z-50 glass-dark rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-violet-600/80 to-primary/80 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-cyan-300" />
                <span className="font-bold">GoalSync AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-900/50 backdrop-blur-sm">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-sm' 
                      : 'bg-white/10 text-gray-200 border border-white/5 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length < 3 && (
              <div className="px-4 py-2 flex flex-wrap gap-2 bg-navy-900/80 border-t border-white/5">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="text-[11px] bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/20 rounded-full px-3 py-1.5 transition flex items-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3" /> {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-navy-900 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Ask for help or guidance..."
                  className="w-full bg-navy-800 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 w-8 flex items-center justify-center bg-violet-500 hover:bg-violet-400 disabled:bg-gray-700 text-white rounded-full transition"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
