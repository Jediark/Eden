
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HeroSlider } from './components/HeroSlider';
import { DailyManna } from './components/DailyManna';
import { About } from './components/About';
import { BibleReader } from './components/BibleReader';
import { PrayerWall } from './components/PrayerWall';
import { Blog } from './components/Blog';
import { Journal } from './components/Journal';
import { GardenCompanion } from './components/GardenCompanion';
import { ArrowRight, Leaf, Waves, Flame, Wind, ExternalLink, RefreshCw } from 'lucide-react';
import { getGroundedTruth } from './geminiService';

function Home() {
  const [currentTopic, setCurrentTopic] = useState("climate and care for the earth");
  const [groundedContent, setGroundedContent] = useState<{text: string, sources: any[]}>({ text: "", sources: [] });
  const [loadingGrounded, setLoadingGrounded] = useState(false);

  const fetchGrounded = async () => {
    setLoadingGrounded(true);
    const res = await getGroundedTruth(currentTopic);
    setGroundedContent(res);
    setLoadingGrounded(false);
  };

  useEffect(() => {
    fetchGrounded();
  }, []);

  const features = [
    { 
      title: "Deepen Roots", 
      path: "/about", 
      color: "#7DD3FC", 
      icon: Leaf,
      desc: "Understand the theology of digital boundaries and the architecture of peace." 
    },
    { 
      title: "Drink from Springs", 
      path: "/library", 
      color: "#FDE047", 
      icon: Waves,
      desc: "Dive into scripture with real-time AI context that bridges 2,000 years of history." 
    },
    { 
      title: "The Secret Place", 
      path: "/journal", 
      color: "#34D399", 
      icon: Flame,
      desc: "A private sanctuary for reflections, now with AI visualization of your prayers." 
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      <HeroSlider />
      
      {/* Daily Bread Section */}
      <section className="bg-slate-900/40 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-[#7DD3FC] text-xs font-bold uppercase tracking-[0.4em] mb-4">Daily Sustenance</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white">Bread for the Journey</h2>
          </div>
          <DailyManna />
        </div>
      </section>

      {/* Current Winds Grounded Search Section */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="glass p-12 rounded-[3rem] border border-[#7DD3FC]/10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#7DD3FC] p-2 rounded-full animate-pulse">
                <Wind className="text-[#0F172A] w-5 h-5" />
              </div>
              <h2 className="text-3xl font-serif text-white">Current Winds</h2>
            </div>
            <button 
              onClick={fetchGrounded}
              disabled={loadingGrounded}
              className="flex items-center gap-2 text-xs font-bold text-[#7DD3FC] hover:text-white transition-colors"
            >
              <RefreshCw size={14} className={loadingGrounded ? 'animate-spin' : ''} />
              REFRESH CONTEXT
            </button>
          </div>

          <div className="space-y-8">
            <p className={`text-xl md:text-2xl text-slate-300 leading-relaxed transition-opacity ${loadingGrounded ? 'opacity-30' : 'opacity-100'}`}>
              {loadingGrounded ? "Consulting current events and eternal truths..." : groundedContent.text}
            </p>
            
            {groundedContent.sources.length > 0 && (
              <div className="pt-8 border-t border-slate-800">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Verifying the Context (Real-world Sources)</h4>
                <div className="flex flex-wrap gap-3">
                  {groundedContent.sources.map((chunk: any, i: number) => (
                    chunk.web && (
                      <a 
                        key={i} 
                        href={chunk.web.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="glass px-4 py-2 rounded-full text-[10px] text-[#7DD3FC] hover:bg-[#7DD3FC]/10 flex items-center gap-2 border border-[#7DD3FC]/20"
                      >
                        {chunk.web.title || "External Source"}
                        <ExternalLink size={10} />
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Entry points */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {features.map((f, i) => (
          <Link 
            key={i}
            to={f.path} 
            className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-[#7DD3FC]/40 transition-all duration-500 group relative flex flex-col h-full overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <f.icon size={120} style={{ color: f.color }} />
            </div>
            <div className="mb-8 bg-slate-900 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5">
              <f.icon style={{ color: f.color }} size={24} />
            </div>
            <h3 className="text-2xl font-serif text-white mb-4" style={{ color: f.color }}>{f.title}</h3>
            <p className="text-slate-400 leading-relaxed mb-8 flex-grow">{f.desc}</p>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span>EXPLORE</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full" style={{ backgroundColor: f.color }} />
          </Link>
        ))}
      </section>

      {/* Whispers Section */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <div className="glass p-16 rounded-[3rem] border border-[#7DD3FC]/10 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0F172A] px-8 py-2 border border-[#7DD3FC]/20 rounded-full shadow-lg">
            <span className="text-xs font-bold tracking-[0.3em] text-[#7DD3FC] uppercase">Whispers from the Garden</span>
          </div>
          <p className="text-2xl md:text-3xl font-serif text-white italic leading-relaxed mb-10">
            "I used to start my day with Twitter. Now I start it in Eden. My anxiety hasn't just lowered—it's been replaced by a deep, quiet resolve."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#7DD3FC] mb-4">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
            </div>
            <h4 className="text-white font-bold">Kaitlyn Vance</h4>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Contemplative Designer</p>
          </div>
        </div>
      </section>

      <GardenCompanion />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/library" element={<BibleReader />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/fellowship" element={<PrayerWall />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
