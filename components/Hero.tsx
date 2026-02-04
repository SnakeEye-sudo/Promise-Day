
import React from 'react';
import { soundManager } from '../services/audioService.ts';
import { Heart, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  onNext: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNext }) => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 flex items-center justify-center pointer-events-none">
        <div className="w-[100vw] h-[100vw] bg-red-300 rounded-full blur-[120px] animate-pulse"></div>
      </div>
      
      <div className="floating z-10 flex flex-col items-center w-full max-w-4xl">
        <div className="relative mb-12 scale-110 md:scale-125">
          <div className="absolute inset-0 bg-red-400 blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative flex items-center justify-center">
            <Heart className="text-red-600 fill-current animate-pulse" size={100} />
            <div className="absolute -top-4 -right-4 text-yellow-400 animate-spin-slow">
              <Sparkles size={36} />
            </div>
            <div className="absolute -bottom-4 -left-4 text-pink-400 animate-bounce">
              <Star size={28} fill="currentColor" />
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="inline-block">
            <span className="bg-red-50 text-red-500 px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 inline-block shadow-sm border border-red-100">
              Valentine's Special 2026
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-romantic text-red-600 drop-shadow-lg leading-tight">
            Happy Propose Day
          </h1>
          
          <div className="relative inline-block mt-4">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-rose-400 blur opacity-10"></div>
            <p className="relative text-[10px] font-bold text-gray-400 tracking-[0.5em] uppercase mb-1">A Promise from the Heart of</p>
            <h2 className="relative text-4xl md:text-6xl font-hindi-title text-red-900 drop-shadow-sm tracking-tight">Er. Sangam Krishna</h2>
          </div>
        </div>

        <div className="relative py-8 px-6 max-w-2xl border-y border-red-50/50 my-4">
          <p className="text-2xl md:text-4xl text-red-800 font-hindi-title leading-relaxed italic drop-shadow-sm">
            "आज दिल की बात जुबां पर लाना चाहता हूँ,<br/>
            जिंदगी भर के लिए तुम्हें अपना बनाना चाहता हूँ।"
          </p>
        </div>
        
        <div className="mt-12">
          <button 
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playPop();
              onNext();
            }}
            className="group relative bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-[0_20px_50px_rgba(220,38,38,0.4)] transition-all hover:-translate-y-2 active:scale-95 flex items-center gap-5 overflow-hidden border-b-4 border-red-800"
          >
            <span className="relative z-10 flex items-center gap-4">
              चलो हम साथ ये 7 वचन लेते हैं 
              <Heart size={28} className="group-hover:fill-current transition-all animate-pulse" />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
