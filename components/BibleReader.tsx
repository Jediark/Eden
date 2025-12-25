
import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Sparkles, MessageSquare, X, PenLine } from 'lucide-react';
import { getBibleContext } from '../geminiService';
import { BiblePassage } from '../types';
import { useNavigate } from 'react-router-dom';

export const BibleReader: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("Psalm 23");
  const [passage, setPassage] = useState<BiblePassage | null>(null);
  const [showAi, setShowAi] = useState(false);
  const [aiContent, setAiContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchBible = async (passageQuery: string) => {
    setSearching(true);
    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(passageQuery)}`);
      const data = await res.json();
      if (data.text) {
        setPassage(data);
        setAiContent(""); // Clear old context
      }
    } catch (e) {
      console.error("Bible Fetch Error", e);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    fetchBible("Psalm 23");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBible(query);
  };

  const handleAiContext = async () => {
    if (!passage) return;
    setShowAi(true);
    if (!aiContent) {
      setLoading(true);
      const context = await getBibleContext(passage.reference, passage.text);
      setAiContent(context);
      setLoading(false);
    }
  };

  const goToJournal = () => {
    if (passage) {
      navigate('/journal', { state: { verse: `${passage.reference}: ${passage.text.substring(0, 100)}...` } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Search Header */}
      <div className="mb-12 flex flex-col items-center">
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search passage (e.g., John 3:16, Romans 8)"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-full px-8 py-4 pl-14 text-white focus:outline-none focus:border-[#7DD3FC] focus:ring-1 focus:ring-[#7DD3FC]/50 transition-all text-lg"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#7DD3FC] transition-colors" />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#7DD3FC] text-[#0F172A] px-6 py-2 rounded-full font-bold text-sm hover:bg-[#FDE047] transition-colors">
            {searching ? 'SEEKING...' : 'OPEN'}
          </button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Reader Pane */}
        <div className="flex-grow glass rounded-3xl p-8 md:p-12 border border-slate-800 min-h-[60vh]">
          {passage ? (
            <>
              <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
                <div className="flex items-center gap-4">
                  <div className="bg-[#7DD3FC]/10 p-3 rounded-2xl">
                    <BookOpen className="text-[#7DD3FC]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif text-white">{passage.reference}</h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{passage.translation_name}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={goToJournal}
                    className="glass p-3 rounded-full hover:border-emerald-400/50 text-emerald-400 transition-colors"
                    title="Journal this word"
                  >
                    <PenLine size={18} />
                  </button>
                  <button 
                    onClick={handleAiContext}
                    className="bg-[#FDE047] text-[#0F172A] px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Sparkles size={16} />
                    GARDEN WISDOM
                  </button>
                </div>
              </div>

              <div className="space-y-6 max-w-3xl mx-auto">
                {passage.verses.map((v) => (
                  <p key={v.number} className="text-xl leading-relaxed text-slate-300">
                    <sup className="text-[#7DD3FC] text-xs font-bold mr-3">{v.number}</sup>
                    {v.text}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
              <BookOpen size={48} className="opacity-20" />
              <p className="italic font-serif text-lg">"The word of God is living and active..."</p>
              <p className="text-sm uppercase tracking-widest">Enter a reference above to begin</p>
            </div>
          )}
        </div>

        {/* AI Sidebar */}
        {showAi && (
          <div className="lg:w-96 glass rounded-3xl p-6 border border-[#7DD3FC]/30 fade-in-up h-fit sticky top-28">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#7DD3FC]">
                <MessageSquare size={18} />
                <span className="font-bold text-sm uppercase">Context Guide</span>
              </div>
              <button onClick={() => setShowAi(false)} className="text-slate-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="prose prose-invert prose-sm max-h-[60vh] overflow-y-auto pr-2">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                  <div className="w-8 h-8 border-4 border-[#7DD3FC]/30 border-t-[#7DD3FC] rounded-full animate-spin"></div>
                  <p className="text-slate-400 italic">Unearthing spiritual depth...</p>
                </div>
              ) : (
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {aiContent}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
