import React from 'react';
import Navbar from './components/Navbar';
import PhysicsHero from './components/PhysicsHero';
import RiskCalculator from './components/RiskCalculator';
import { useLanguage } from './context/LanguageContext';
import { translations } from './data/translations';
import { ShieldCheck, Zap, TrendingUp, Info } from 'lucide-react';

function App() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      
      <main>
        <PhysicsHero />
        <RiskCalculator />

        {/* Feature Highlights section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <h2 className="font-space text-3xl md:text-5xl font-bold text-white text-center mb-16">
                {language === 'hindi' ? 'हमारा प्लेटफॉर्म क्यों?' : language === 'hinglish' ? 'Kyun choose karein humein?' : 'Why PAsthee.ai?'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-bg-card border border-white/5 hover:border-accent-cyan/30 transition-all group">
                    <ShieldCheck className="w-12 h-12 text-accent-cyan mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-4">
                        {language === 'hindi' ? 'कैरियर बीमा' : language === 'hinglish' ? 'Career Insurance' : 'Career Insurance'}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                        {language === 'hindi' ? 'AI युग में अपने बच्चे के भविष्य को सुरक्षित करें।' : language === 'hinglish' ? 'AI era mein apne child ka future secure karein.' : 'Protect your child\'s future in the AI-driven job market.'}
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-bg-card border border-white/5 hover:border-accent-purple/30 transition-all group">
                    <Zap className="w-12 h-12 text-accent-purple mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-4">
                        {language === 'hindi' ? 'प्राक्टिकल स्किल्स' : language === 'hinglish' ? 'Practical Skills' : 'Practical Skills'}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                        {language === 'hindi' ? 'केवल थ्योरी नहीं, बल्कि वास्तविक दुनिया के प्रोजेक्ट्स।' : language === 'hinglish' ? 'Sirf theory nahi, balki real world projects.' : 'Not just theory, building real artifacts with AI assistance.'}
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-bg-card border border-white/5 hover:border-accent-green/30 transition-all group">
                    <TrendingUp className="w-12 h-12 text-accent-green mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-4">
                        {language === 'hindi' ? 'ROI पर ध्यान' : language === 'hinglish' ? 'ROI focused' : 'ROI Focused'}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                        {language === 'hindi' ? 'हर स्किल का सीधा असर करियर ग्रोथ और सैलरी पर।' : language === 'hinglish' ? 'Har skill ka direct impact career growth aur salary par.' : 'Every skill learned directly translates to income potential.'}
                    </p>
                </div>
            </div>
        </section>

        {/* Footer Trust Signals */}
        <footer className="py-12 border-t border-white/5 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6 opacity-60">
                    <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-6 filter grayscale brightness-200" />
                    <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">{t.brand} TRUST SIGNALS</span>
                </div>
                <div className="flex gap-8 text-xs font-bold text-text-secondary uppercase tracking-widest">
                    <a href="#" className="hover:text-white">Privacy</a>
                    <a href="#" className="hover:text-white">Terms</a>
                    <a href="#" className="hover:text-white">Refunds</a>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-accent-amber/10 border border-accent-amber/20 rounded-full">
                    <Info className="w-3 h-3 text-accent-amber" />
                    <span className="text-[10px] font-bold text-accent-amber uppercase tracking-wider">30-Day Money Back Guarantee</span>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
