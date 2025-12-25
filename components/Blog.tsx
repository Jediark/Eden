
import React, { useState } from 'react';
import { Leaf, Clock, BrainCircuit, X } from 'lucide-react';
import { BLOG_POSTS } from '../mockData';
import { getBlogSummary } from '../geminiService';

export const Blog: React.FC = () => {
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  const handleSummarize = async (content: string, id: string) => {
    setSummarizingId(id);
    const result = await getBlogSummary(content);
    setSummary(result);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center mb-16 text-center">
        <Leaf className="text-[#7DD3FC] w-12 h-12 mb-4" />
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Leaves of Healing</h2>
        <p className="text-slate-400 max-w-2xl">Devotionals, life lessons, and spiritual intersections for the modern digital resident.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="glass rounded-3xl overflow-hidden border border-slate-800 flex flex-col group">
            <div className="h-64 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#7DD3FC] text-[#0F172A] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                {post.category}
              </div>
            </div>
            
            <div className="p-8 flex-grow">
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Clock size={12} /> {post.date}</span>
                <span>By {post.author}</span>
              </div>
              <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-[#7DD3FC] transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                {post.content}
              </p>
              
              <div className="flex gap-3">
                <button className="text-[#7DD3FC] font-bold text-sm hover:underline">Read Full Devotional</button>
                <button 
                  onClick={() => handleSummarize(post.content, post.id)}
                  className="flex items-center gap-2 bg-[#7DD3FC]/10 text-[#7DD3FC] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#7DD3FC]/20 transition-colors"
                >
                  <BrainCircuit size={14} />
                  SUMMARIZE FOR ME
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Summary Modal */}
      {summary && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-[#0F172A]/80 backdrop-blur-sm">
          <div className="glass max-w-lg w-full rounded-3xl p-8 border border-[#7DD3FC]/30 shadow-2xl fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#FDE047]">
                <BrainCircuit />
                <span className="font-bold text-sm uppercase">Quick Healing Summary</span>
              </div>
              <button onClick={() => {setSummary(null); setSummarizingId(null);}} className="text-slate-500 hover:text-white">
                <X />
              </button>
            </div>
            <div className="prose prose-invert prose-sm">
              <p className="text-slate-300 leading-relaxed italic whitespace-pre-wrap">
                {summary}
              </p>
            </div>
            <div className="mt-8">
              <button 
                onClick={() => {setSummary(null); setSummarizingId(null);}}
                className="w-full bg-[#7DD3FC] text-[#0F172A] py-3 rounded-xl font-bold"
              >
                GOT IT, PEACE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
