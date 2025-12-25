
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Book, Users, Info, Home, PenTool } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'The Gate', path: '/', icon: Home },
    { name: 'The Roots', path: '/about', icon: Info },
    { name: 'The Springs', path: '/library', icon: Book },
    { name: 'The Secret Place', path: '/journal', icon: PenTool },
    { name: 'The Fellowship', path: '/fellowship', icon: Users },
    { name: 'Leaves of Healing', path: '/blog', icon: Leaf },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 glass border-b border-[#7DD3FC]/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-[#7DD3FC] p-2 rounded-full group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_15px_rgba(125,211,252,0.3)]">
              <Leaf className="text-[#0F172A] w-5 h-5" />
            </div>
            <span className="text-2xl font-serif text-[#7DD3FC] tracking-wide">Eden</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all hover:text-[#7DD3FC] relative group ${
                  location.pathname === item.path ? 'text-[#7DD3FC]' : 'text-slate-400'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#7DD3FC] transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          <button 
            className="md:hidden text-[#7DD3FC]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4 fade-in-up">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
              >
                <item.icon className="w-5 h-5 text-[#7DD3FC]" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="bg-[#0F172A] border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-serif text-[#7DD3FC] mb-4">Eden</h3>
            <p className="text-slate-400 text-sm italic">
              "To be the digital soil where the Word of God grows in the hearts of a weary world."
            </p>
          </div>
          <div>
            <h4 className="text-[#FDE047] font-semibold mb-4">Sanctuary Sections</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <Link to="/library" className="block hover:text-white">Bible Reader</Link>
              <Link to="/journal" className="block hover:text-white">Quiet Time Journal</Link>
              <Link to="/fellowship" className="block hover:text-white">Prayer Wall</Link>
            </div>
          </div>
          <div>
            <h4 className="text-[#FDE047] font-semibold mb-4">Community</h4>
            <p className="text-sm text-slate-400 mb-4">Join our quiet mailing for a weekly seed of peace.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#7DD3FC] w-full"
              />
              <button className="bg-[#7DD3FC] text-[#0F172A] px-4 py-2 rounded-lg text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} Eden – The Place of Refuge. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
