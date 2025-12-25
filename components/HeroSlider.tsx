
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SCENES = [
  {
    id: 1,
    title: "The Origin",
    subtitle: "A return to the beginning of peace.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1920",
    overlay: "Return to the Garden of Stillness."
  },
  {
    id: 2,
    title: "Eternal Light",
    subtitle: "Clarity in the midst of confusion.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920",
    overlay: "Bathed in Grace, Find Your Rest."
  },
  {
    id: 3,
    title: "Living Waters",
    subtitle: "Hydration for the thirsty soul.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1920",
    overlay: "He Leads You Beside Still Waters."
  },
  {
    id: 4,
    title: "Celestial Heights",
    subtitle: "A perspective beyond the horizon.",
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1920",
    overlay: "Transcending the Noise of the World."
  }
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SCENES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % SCENES.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? SCENES.length - 1 : prev - 1));

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {SCENES.map((scene, idx) => (
        <div
          key={scene.id}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-[10000ms] ease-linear"
            style={{ 
              backgroundImage: `url(${scene.image})`,
              transform: idx === current ? 'scale(1)' : 'scale(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 via-[#0F172A]/20 to-[#0F172A]" />
          
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="flex items-center gap-2 mb-6 opacity-80 fade-in-up">
              <Sparkles className="text-[#FDE047] w-4 h-4" />
              <h2 className="text-xs md:text-sm uppercase tracking-[0.5em] text-[#7DD3FC]">
                {scene.title}
              </h2>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 max-w-5xl leading-[1.1] fade-in-up" style={{ animationDelay: '0.2s' }}>
              {scene.overlay}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-10 italic fade-in-up" style={{ animationDelay: '0.4s' }}>
              "{scene.subtitle}"
            </p>
            <div className="flex flex-col sm:flex-row gap-6 fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link to="/library" className="bg-[#7DD3FC] hover:bg-white text-[#0F172A] px-10 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(125,211,252,0.4)]">
                Seek the Word
              </Link>
              <Link to="/fellowship" className="glass text-white px-10 py-4 rounded-full font-bold border border-[#7DD3FC]/30 hover:bg-[#7DD3FC]/10 transition-all">
                Join the Fellowship
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button 
        onClick={prev}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass text-[#7DD3FC] hover:text-white transition-all hover:scale-110"
      >
        <ChevronLeft size={28} />
      </button>
      <button 
        onClick={next}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass text-[#7DD3FC] hover:text-white transition-all hover:scale-110"
      >
        <ChevronRight size={28} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {SCENES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 rounded-full transition-all duration-700 ${
              idx === current ? 'w-12 bg-[#7DD3FC]' : 'w-3 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
