
import React, { useState, useEffect } from 'react';
import { PenTool, Sparkles, Save, Trash2, ChevronRight, Flower2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { getJournalPrompt, generateVision } from '../geminiService';
import { JournalEntry } from '../types';
import { useLocation } from 'react-router-dom';

export const Journal: React.FC = () => {
  const location = useLocation();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<Partial<JournalEntry>>({
    title: "",
    content: "",
    verse: location.state?.verse || ""
  });
  const [prompt, setPrompt] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('eden_journal');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const saveToLocal = (updated: JournalEntry[]) => {
    setEntries(updated);
    localStorage.setItem('eden_journal', JSON.stringify(updated));
  };

  const handleSave = () => {
    if (!activeEntry.title || !activeEntry.content) return;
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: activeEntry.title!,
      content: activeEntry.content!,
      verse: activeEntry.verse,
      timestamp: Date.now(),
    };

    saveToLocal([newEntry, ...entries]);
    setActiveEntry({ title: "", content: "", verse: "" });
    setGeneratedImage(null);
    setPrompt("");
  };

  const deleteEntry = (id: string) => {
    saveToLocal(entries.filter(e => e.id !== id));
  };

  const generatePrompt = async () => {
    setLoadingPrompt(true);
    const p = await getJournalPrompt(activeEntry.verse);
    setPrompt(p);
    setLoadingPrompt(false);
  };

  const handleVisualize = async () => {
    if (!activeEntry.content || isVisualizing) return;
    setIsVisualizing(true);
    const img = await generateVision(activeEntry.content);
    setGeneratedImage(img);
    setIsVisualizing(false);
  };

  const growthProgress = Math.min((entries.length / 10) * 100, 100);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
      {/* Editor Side */}
      <div className="flex-grow space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-serif text-white">The Secret Place</h2>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-slate-500">Spiritual Growth</span>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-400 transition-all duration-1000 shadow-[0_0_10px_rgba(52,211,153,0.5)]" 
                style={{ width: `${growthProgress}%` }}
              />
            </div>
            <Flower2 className={`w-5 h-5 ${growthProgress === 100 ? 'text-[#FDE047]' : 'text-slate-700'}`} />
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-8 md:p-12 border border-slate-800 space-y-6 relative overflow-hidden">
          {/* Visualization Overlay Background */}
          {generatedImage && (
            <div className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-1000">
              <img src={generatedImage} alt="Background Visualization" className="w-full h-full object-cover blur-xl" />
            </div>
          )}

          <input 
            type="text" 
            placeholder="Reflection Title"
            className="w-full bg-transparent text-3xl font-serif text-[#7DD3FC] focus:outline-none placeholder:text-slate-800 relative z-10"
            value={activeEntry.title}
            onChange={(e) => setActiveEntry({...activeEntry, title: e.target.value})}
          />
          
          {activeEntry.verse && (
            <div className="bg-[#7DD3FC]/5 border-l-2 border-[#7DD3FC] p-4 text-sm text-slate-400 italic relative z-10">
              Focused Word: {activeEntry.verse}
            </div>
          )}

          <textarea 
            placeholder="Pour out your heart here..."
            className="w-full bg-transparent min-h-[300px] text-slate-300 leading-relaxed focus:outline-none resize-none text-xl relative z-10"
            value={activeEntry.content}
            onChange={(e) => setActiveEntry({...activeEntry, content: e.target.value})}
          />

          {generatedImage && (
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl fade-in-up">
              <img src={generatedImage} alt="Vision" className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Vision of your soul's reflection</span>
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-slate-800 flex flex-wrap gap-4 justify-between items-center relative z-10">
            <div className="flex gap-4">
              <button 
                onClick={generatePrompt}
                disabled={loadingPrompt}
                className="text-xs font-bold text-[#FDE047] flex items-center gap-2 hover:opacity-80 disabled:opacity-50"
              >
                <Sparkles size={14} className={loadingPrompt ? 'animate-spin' : ''} />
                NEED A SEED?
              </button>
              <button 
                onClick={handleVisualize}
                disabled={isVisualizing || !activeEntry.content}
                className="text-xs font-bold text-[#7DD3FC] flex items-center gap-2 hover:opacity-80 disabled:opacity-50"
              >
                {isVisualizing ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
                VISUALIZE PRAYER
              </button>
            </div>
            <button 
              onClick={handleSave}
              className="bg-[#7DD3FC] text-[#0F172A] px-10 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-all transform hover:scale-105 shadow-xl"
            >
              <Save size={18} />
              SAVE TO THE GARDEN
            </button>
          </div>

          {prompt && (
            <div className="mt-4 p-5 glass border border-[#FDE047]/20 rounded-2xl fade-in-up relative z-10">
              <p className="text-sm text-[#FDE047] font-medium leading-relaxed italic">
                "{prompt}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* History Side */}
      <div className="lg:w-80 space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Ancient Paths</h3>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
          {entries.length === 0 ? (
            <div className="text-center py-24 text-slate-700">
              <PenTool size={48} className="mx-auto mb-6 opacity-10" />
              <p className="text-sm italic">The soil is ready for your first reflection.</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="glass p-6 rounded-2xl border border-slate-800 group hover:border-[#7DD3FC]/30 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-serif text-[#7DD3FC] text-lg">{entry.title}</h4>
                  <button onClick={(e) => {e.stopPropagation(); deleteEntry(entry.id);}} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity">
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {entry.content}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800/50">
                  <span className="text-[10px] text-slate-500">{new Date(entry.timestamp).toLocaleDateString()}</span>
                  <ChevronRight size={14} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
