import React from 'react';
import { useLanguage, languages } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Globe, Shield } from 'lucide-react';

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-purple flex items-center justify-center">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="font-space text-xl font-bold tracking-tight text-white">
            {t.brand}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#" className="hover:text-accent-cyan transition-colors">{t.navHome}</a>
          <a href="#" className="hover:text-accent-cyan transition-colors">{t.navFeatures}</a>
          <a href="#" className="hover:text-accent-cyan transition-colors">{t.navPricing}</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-bg-card rounded-full px-3 py-1.5 border border-white/5">
            <Globe className="w-4 h-4 text-accent-cyan" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs font-bold text-text-primary focus:outline-none cursor-pointer"
            >
              <option value={languages.HINGLISH} className="bg-bg-card">Hinglish</option>
              <option value={languages.ENGLISH} className="bg-bg-card">English</option>
              <option value={languages.HINDI} className="bg-bg-card">Hindi</option>
            </select>
          </div>
          <button className="bg-accent-cyan hover:bg-cyan-500 text-bg-primary font-bold py-2 px-4 rounded-lg text-sm transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
