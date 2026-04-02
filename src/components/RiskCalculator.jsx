import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Search, AlertTriangle, Lightbulb, TrendingUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RiskCalculator = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [career, setCareer] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState(null);

  const scanMessages = [
    t.scanning,
    t.analyzing,
    t.crossRef
  ];

  const handleCalculate = async () => {
    if (!career) return;
    setScanning(true);
    setResult(null);
    for (let i = 0; i < scanMessages.length; i++) {
        setScanStep(i);
        await new Promise(r => setTimeout(r, 1200));
    }
    setScanning(false);
    setResult({
        name: career,
        risk: Math.floor(Math.random() * 60) + 30, // Mock risk
        potential: "Top 5%",
        salaryGain: "₹3.5L → ₹12L+"
    });
  };

  return (
    <div id="calculator" className="max-w-4xl mx-auto px-6 -mt-20 relative z-20">
      <div className="bg-bg-secondary border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
            <input 
              type="text"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              placeholder={t.calcPlaceholder}
              className="w-full bg-bg-primary border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-text-secondary outline-none focus:border-accent-cyan transition-all"
            />
          </div>
          <button 
            onClick={handleCalculate}
            disabled={scanning}
            className="bg-accent-cyan hover:bg-cyan-500 text-bg-primary font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {scanning ? <Loader2 className="animate-spin" /> : null}
            {t.calcBtn}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {scanning && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="flex items-center gap-4 py-6 border-t border-white/5"
            >
                <div className="w-2 h-2 rounded-full bg-accent-amber animate-ping" />
                <p className="text-accent-amber font-mono text-sm tracking-widest uppercase">
                    {scanMessages[scanStep]}
                </p>
            </motion.div>
          )}

          {result && (
            <motion.div 
               initial={{ opacity: 0, y: 10 }} 
               animate={{ opacity: 1, y: 0 }}
               className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/5"
            >
                <div className="bg-bg-primary/50 p-6 rounded-xl border border-danger/20 flex flex-col items-center text-center">
                    <AlertTriangle className="text-danger w-8 h-8 mb-4 animate-pulse" />
                    <h3 className="text-text-secondary text-sm mb-1">{t.riskTitle}</h3>
                    <p className="text-3xl font-bold text-danger">{result.risk}%</p>
                </div>
                
                <div className="bg-bg-primary/50 p-6 rounded-xl border border-accent-purple/20 flex flex-col items-center text-center">
                    <Lightbulb className="text-accent-purple w-8 h-8 mb-4 shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
                    <h3 className="text-text-secondary text-sm mb-1">{t.potentialTitle}</h3>
                    <p className="text-lg font-bold text-white">Unstoppable Edge</p>
                </div>

                <div className="bg-bg-primary/50 p-6 rounded-xl border border-accent-green/20 flex flex-col items-center text-center">
                    <TrendingUp className="text-accent-green w-8 h-8 mb-4" />
                    <h3 className="text-text-secondary text-sm mb-1">{t.salaryTitle}</h3>
                    <p className="text-lg font-bold text-accent-green">{result.salaryGain}</p>
                </div>
                
                <div className="md:col-span-3 mt-4">
                    <button className="w-full bg-bg-primary hover:bg-bg-card border-2 border-accent-cyan text-accent-cyan font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        {t.ctaBtn}
                    </button>
                    <p className="text-center text-text-secondary text-xs mt-4 italic">
                        {t.socialProof}
                    </p>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RiskCalculator;
