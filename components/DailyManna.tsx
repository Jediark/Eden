
import React, { useState, useEffect } from 'react';
import { Quote, Sparkles, RefreshCw } from 'lucide-react';
import { DAILY_VERSES } from '../mockData';
import { getPeaceReflection } from '../geminiService';
import { Verse } from '../types';

export const DailyManna: React.FC = () => {
  const [verse, setVerse] = useState<Verse>(DAILY_VERSES[0]);
  const [reflection, setReflection] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchReflection = async (v: Verse) => {
    setLoading(true);
    const text = await getPeaceReflection(v);
    setReflection(text);
    setLoading(false);
  };

  const getNewVerse = () => {
    const random = DAILY_VERSES[Math.floor(Math.random() * DAILY_VERSES.length)];
    setVerse(random);
  };

  useEffect(() => {
    fetchReflection(verse);
  }, [verse]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="glass rounded-3xl p-8 md:p-12 border border-[#7DD3FC]/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <Quote size={120} className="text-[#7DD3FC]" />
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-[#7DD3FC] p-1.5 rounded-full">
            <Sparkles size={16} className="text-[#0F172A]" />
          </div>
          <span className="text-[#7DD3FC] font-semibold tracking-widest text-xs uppercase">Daily Manna</span>
        </div>

        <blockquote className="relative z-10 mb-8">
          <p className="text-2xl md:text-3xl font-serif text-white mb-4 leading-relaxed">
            "{verse.text}"
          </p>
          <cite className="text-[#FDE047] not-italic font-bold tracking-wider">
            — {verse.reference}
          </cite>
        </blockquote>

        <div className="border-t border-slate-700/50 pt-8 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-tighter">AI Peace Reflection</span>
          </div>
          <p className={`text-slate-300 italic leading-relaxed transition-opacity duration-500 ${loading ? 'opacity-30' : 'opacity-100'}`}>
            {loading ? "Seeking wisdom from the Garden..." : reflection}
          </p>
        </div>

        <button 
          onClick={getNewVerse}
          disabled={loading}
          className="mt-8 flex items-center gap-2 text-xs font-bold text-[#7DD3FC] hover:text-[#FDE047] transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          REFRESH SOUL
        </button>
      </div>
    </div>
  );
};
