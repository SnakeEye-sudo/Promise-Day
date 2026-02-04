
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero.tsx';
import VachanSection from './components/VachanSection.tsx';
import HeartRain from './components/HeartRain.tsx';
import SpecialNote from './components/SpecialNote.tsx';
import ProposalModal from './components/ProposalModal.tsx';
import { Volume2, VolumeX, Heart } from 'lucide-react';
import { soundManager } from './services/audioService.ts';

const App: React.FC = () => {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [step, setStep] = useState<'hero' | 'vachans' | 'proposal' | 'note'>('hero');

  useEffect(() => {
    const startAudio = () => {
      if (!isMusicOn) {
        soundManager.toggleBackgroundMusic();
        setIsMusicOn(true);
      }
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
    window.addEventListener('click', startAudio);
    window.addEventListener('touchstart', startAudio);
    return () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  }, [isMusicOn]);

  const toggleMusic = () => {
    soundManager.toggleBackgroundMusic();
    setIsMusicOn(soundManager.isMusicPlaying);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-[#fff5f5] to-white selection:bg-red-200 selection:text-red-900 flex flex-col">
      <HeartRain />
      
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 glass-morphism">
        <div className="flex items-center gap-2">
            <Heart className="text-red-600 animate-pulse fill-current" size={28} />
            <div className="text-2xl font-romantic text-red-600 font-bold">Forever Yours</div>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={toggleMusic}
             className={`p-3 rounded-full transition-all duration-300 ${isMusicOn ? 'bg-red-100 text-red-600 shadow-inner' : 'bg-white/50 text-gray-400'}`}
             title={isMusicOn ? "Music On" : "Music Off"}
           >
              {isMusicOn ? <Volume2 size={24} className="animate-pulse" /> : <VolumeX size={24} />}
           </button>
        </div>
      </nav>

      <main className="flex-1 relative overflow-hidden flex items-center justify-center">
        <div className="w-full h-full transition-all duration-700 ease-in-out">
          {step === 'hero' && (
            <div className="animate-fade-in h-full flex items-center justify-center">
              <Hero onNext={() => setStep('vachans')} />
            </div>
          )}
          
          {step === 'vachans' && (
            <div className="animate-fade-in h-full flex items-center justify-center w-full">
              <VachanSection onComplete={() => setStep('proposal')} />
            </div>
          )}

          {step === 'proposal' && (
            <div className="animate-fade-in h-full flex items-center justify-center w-full">
              <ProposalModal onAccepted={() => setStep('note')} />
            </div>
          )}

          {step === 'note' && (
            <div className="animate-fade-in h-full flex items-center justify-center w-full">
              <SpecialNote onRestart={() => setStep('hero')} />
            </div>
          )}
        </div>
      </main>

      <footer className="p-4 bg-white/30 backdrop-blur-sm text-center z-10 border-t border-red-50">
          <p className="text-xs opacity-60 tracking-widest font-bold uppercase text-red-900">
            Er. Sangam Krishna | Propose Day Special 2026
          </p>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
