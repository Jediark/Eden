
import React from 'react';
import { Sprout, Compass, ShieldCheck, Heart, Wind, Star } from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    { icon: Wind, title: "Silence", desc: "We believe God's loudest language is the stillness within." },
    { icon: Heart, title: "Love", desc: "Every interaction in Eden is rooted in radical compassion." },
    { icon: Star, title: "Clarity", desc: "Using AI to peel back the layers of history and language." }
  ];

  return (
    <div className="bg-[#0F172A]">
      {/* Parallax Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-30 scale-105"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1920)` }}
        />
        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className="text-[#FDE047] uppercase tracking-[0.5em] text-xs font-bold mb-4 block">The Genesis of Eden</span>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 fade-in-up">The Roots</h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light fade-in-up" style={{ animationDelay: '0.2s' }}>
            "In a world of noise, we are building a sanctuary of signal. Eden is the digital terraforming of the human spirit."
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif text-[#7DD3FC] leading-tight">A Boundary Against the Storm</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              We did not build Eden to be another 'destination' on the web. We built it to be a refuge—a digital soil where the seeds of ancient wisdom can finally find a quiet place to grow. 
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              By blending the contemplative traditions of the desert fathers with the computational power of modern neural networks, we offer a unique lens: one that sees through the static of 24-hour cycles into the eternity of the Word.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              {values.map((v, i) => (
                <div key={i} className="glass p-6 rounded-3xl border border-white/5 hover:border-[#7DD3FC]/30 transition-all group">
                  <v.icon className="text-[#FDE047] mb-4 w-6 h-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">{v.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-tight">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden border-8 border-slate-800/50 -rotate-2 hover:rotate-0 transition-all duration-1000 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1518128485410-b1d17d6534eb?auto=format&fit=crop&q=80&w=800" alt="Contemplation" className="w-full object-cover aspect-[4/5]" />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-10 rounded-[2rem] max-w-sm border border-[#7DD3FC]/20 shadow-2xl fade-in-up">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-[#FDE047] fill-current" />)}
              </div>
              <p className="text-lg italic text-white leading-relaxed mb-4">"Finally, a place on the internet that doesn't want my attention, but my presence."</p>
              <p className="text-xs text-[#7DD3FC] font-bold uppercase tracking-widest">— Sarah J., Member since 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="bg-slate-900/50 py-32 px-6 border-y border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#7DD3FC] blur-[200px] rounded-full" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-sm uppercase tracking-[0.5em] text-[#7DD3FC] mb-12">The Eternal Mandate</h2>
          <p className="text-4xl md:text-7xl font-serif text-white italic leading-[1.2]">
            "To cultivate a digital Eden where technology bows to the Word, and the soul finds its native home."
          </p>
        </div>
      </section>
    </div>
  );
};
