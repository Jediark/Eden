
import React, { useState, useEffect } from 'react';
import { Heart, Send, Users, History } from 'lucide-react';
import { INITIAL_PRAYERS } from '../mockData';
import { PrayerRequest } from '../types';

export const PrayerWall: React.FC = () => {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [newRequest, setNewRequest] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('eden_prayers');
    if (saved) {
      setPrayers(JSON.parse(saved));
    } else {
      setPrayers(INITIAL_PRAYERS);
    }
  }, []);

  const savePrayers = (updated: PrayerRequest[]) => {
    setPrayers(updated);
    localStorage.setItem('eden_prayers', JSON.stringify(updated));
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.trim() || !userName.trim()) return;

    const req: PrayerRequest = {
      id: Date.now().toString(),
      user: userName,
      content: newRequest,
      amens: 0,
      timestamp: Date.now()
    };

    savePrayers([req, ...prayers]);
    setNewRequest("");
  };

  const handleAmen = (id: string) => {
    const updated = prayers.map(p => 
      p.id === id ? { ...p, amens: p.amens + 1, isPrayed: true } : p
    );
    savePrayers(updated);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="text-[#7DD3FC]" />
        </div>
        <h2 className="text-4xl font-serif text-white mb-4">The Fellowship</h2>
        <p className="text-slate-400">Cast your burdens and stand in the gap for others.</p>
      </div>

      {/* Post Box */}
      <div className="glass rounded-3xl p-8 mb-12 border border-[#7DD3FC]/10">
        <form onSubmit={handlePost} className="space-y-4">
          <input 
            type="text" 
            placeholder="Your name"
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7DD3FC]"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <textarea 
            placeholder="What would you like the fellowship to pray for?"
            rows={3}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7DD3FC] resize-none"
            value={newRequest}
            onChange={(e) => setNewRequest(e.target.value)}
          />
          <button 
            type="submit"
            className="w-full bg-[#7DD3FC] text-[#0F172A] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#FDE047] transition-all"
          >
            <Send size={18} />
            LIFT TO HEAVEN
          </button>
        </form>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-[#7DD3FC] mb-4">
          <History size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Real-time Petitions</span>
        </div>
        {prayers.map((prayer) => (
          <div key={prayer.id} className="glass rounded-2xl p-6 border border-slate-800 fade-in-up">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-[#7DD3FC] bg-[#7DD3FC]/10 px-3 py-1 rounded-full">
                {prayer.user}
              </span>
              <span className="text-[10px] text-slate-500 uppercase">
                {new Date(prayer.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              {prayer.content}
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleAmen(prayer.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  prayer.isPrayed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Heart size={14} className={prayer.isPrayed ? 'fill-current' : ''} />
                AMEN
              </button>
              {prayer.amens > 0 && (
                <span className="text-xs text-slate-500 italic">
                  {prayer.amens} souls praying
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
