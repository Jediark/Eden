
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, MinusCircle } from 'lucide-react';
import { createCompanionChat } from '../geminiService';

export const GardenCompanion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Peace be with you. I am your Garden Companion. How may I walk with you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      chatRef.current = createCompanionChat();
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [isOpen, messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'bot', text: response.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Forgive me, my connection to the springs is weak right now. Let us sit in silence for a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] bg-[#7DD3FC] text-[#0F172A] p-4 rounded-full shadow-[0_0_30px_rgba(125,211,252,0.5)] hover:scale-110 transition-all group"
      >
        <div className="absolute inset-0 rounded-full animate-ping bg-[#7DD3FC] opacity-20" />
        <MessageCircle className="relative z-10" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#0F172A] border border-[#7DD3FC]/30 text-[#7DD3FC] px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Speak with the Companion
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-8 right-8 z-[100] glass border border-[#7DD3FC]/30 rounded-[2rem] shadow-2xl transition-all duration-500 flex flex-col ${isMinimized ? 'h-16 w-64' : 'h-[500px] w-[350px] md:w-[400px]'}`}>
      {/* Header */}
      <div className="p-4 border-b border-[#7DD3FC]/10 flex justify-between items-center bg-[#7DD3FC]/5 rounded-t-[2rem]">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#FDE047]" />
          <span className="font-serif text-[#7DD3FC] font-bold">Garden Companion</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="text-slate-500 hover:text-white">
            <MinusCircle size={18} />
          </button>
          <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Feed */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#7DD3FC] text-[#0F172A] rounded-tr-none' 
                    : 'bg-slate-800/50 text-slate-200 border border-slate-700 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/50 p-3 rounded-2xl animate-pulse text-xs text-slate-500">
                  The Companion is reflecting...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-[#7DD3FC]/10 bg-slate-900/50 rounded-b-[2rem]">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for wisdom or comfort..."
                className="w-full bg-slate-800 border border-slate-700 rounded-full px-5 py-3 pr-12 text-sm text-white focus:outline-none focus:border-[#7DD3FC]"
              />
              <button 
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7DD3FC] hover:text-white disabled:opacity-30"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
