
import React, { useState } from 'react';
import { VACHANS, ICON_MAP } from '../constants.tsx';
import { ChevronRight, ChevronLeft, Sparkles, Heart } from 'lucide-react';
import { soundManager } from '../services/audioService.ts';

interface VachanSectionProps {
  onComplete: () => void;
}

const VachanSection: React.FC<VachanSectionProps> = ({ onComplete }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    soundManager.playPop();
    setIsAnimating(true);
    setTimeout(() => {
      if (activeIndex < VACHANS.length - 1) {
        setActiveIndex(activeIndex + 1);
        setIsAnimating(false);
      } else {
        soundManager.playChime();
        onComplete();
        setIsAnimating(false);
      }
    }, 400);
  };

  const handlePrev = () => {
    if (activeIndex > 0 && !isAnimating) {
      soundManager.playPop();
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex(activeIndex - 1);
        setIsAnimating(false);
      }, 400);
    }
  };

  const currentVachan = VACHANS[activeIndex];
  const progress = ((activeIndex + 1) / VACHANS.length) * 100;

  const bgColors = [
    'from-red-50 to-pink-100',
    'from-pink-50 to-rose-100',
    'from-rose-50 to-red-100',
    'from-orange-50 to-red-100',
    'from-red-50 to-orange-100',
    'from-pink-100 to-red-50',
    'from-red-100 to-rose-200'
  ];

  return (
    <section className={`h-full w-full relative flex items-center justify-center overflow-hidden transition-colors duration-1000 bg-gradient-to-br ${bgColors[activeIndex]}`}>
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 animate-pulse text-red-300"><Heart size={100} fill="currentColor" /></div>
        <div className="absolute bottom-10 right-10 animate-bounce text-pink-300"><Heart size={80} fill="currentColor" /></div>
      </div>

      <div className="max-w-4xl w-full relative z-10 p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-yellow-500 animate-spin-slow" size={20} />
            <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs">Sacred Vows</span>
            <Sparkles className="text-yellow-500 animate-spin-slow" size={20} />
          </div>
          <h2 className="text-4xl md:text-6xl font-hindi-title text-red-800 mb-2 drop-shadow-sm">हमारे ७ फेरे, ७ वचन</h2>
        </div>

        <div className="mb-10 max-w-lg mx-auto">
          <div className="flex justify-between items-end mb-2 px-2">
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">रिश्ते की गहराई</span>
                <span className="text-xl font-romantic text-red-600">Promise {activeIndex + 1}</span>
            </div>
            <div className="text-right">
                <span className="text-2xl font-bold text-red-700">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="h-3 w-full bg-white/50 rounded-full p-1 shadow-inner backdrop-blur-sm border border-white">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-full transition-all duration-1000 ease-in-out relative"
              style={{ width: `${progress}%` }}
            >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[450px] flex items-center justify-center">
          <div 
            className={`w-full glass-morphism p-8 md:p-14 rounded-[3rem] shadow-xl border border-white/50 flex flex-col items-center text-center transform transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-10 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}
          >
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-red-400 blur-2xl opacity-10 animate-pulse"></div>
                <div 
                  key={`icon-${currentVachan.id}`}
                  className="relative p-6 bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-md transform transition-transform animate-bounce-in"
                >
                  {ICON_MAP[currentVachan.icon]}
                </div>
            </div>
            
            <h3 
              key={`title-${currentVachan.id}`}
              className="text-3xl md:text-5xl font-bold text-red-900 mb-6 font-hindi-title animate-bounce-in"
            >
              {currentVachan.title}
            </h3>
            
            <div className="relative mb-8">
                <p 
                  key={`desc-${currentVachan.id}`}
                  className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium italic px-4 animate-fade-in-up"
                >
                  {currentVachan.description}
                </p>
            </div>

            <div className="flex gap-4 items-center mt-auto">
              {activeIndex > 0 && (
                <button 
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={handlePrev}
                  className="p-4 rounded-full bg-white text-red-400 hover:text-red-600 shadow-md transition-all border border-red-50"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              
              <button 
                onMouseEnter={() => soundManager.playHover()}
                onClick={handleNext}
                className="group relative flex items-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-10 py-5 rounded-full text-xl font-bold shadow-lg transition-all active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {activeIndex === VACHANS.length - 1 ? 'पवित्र बंधन स्वीकार है' : 'मैं वादा करती हूँ'}
                  <Heart size={20} className="group-hover:fill-current" />
                </span>
              </button>
            </div>
          </div>
          
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {VACHANS.map((_, i) => (
              <div 
                key={i}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === activeIndex ? 'w-8 bg-red-600' : 'w-2 bg-red-100'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
          animation-delay: 0.1s;
        }
      `}</style>
    </section>
  );
};

export default VachanSection;
