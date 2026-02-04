
import React, { useState } from 'react';
import { Heart, Sparkles, Star, PartyPopper } from 'lucide-react';
import { soundManager } from '../services/audioService.ts';

interface ProposalModalProps {
  onAccepted: () => void;
}

const ConfettiPiece: React.FC<{ delay: number; angle: number; distance: number }> = ({ delay, angle, distance }) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  
  return (
    <div 
      className="absolute top-1/2 left-1/2 text-red-500 pointer-events-none"
      style={{
        animation: `confetti-burst 1.5s cubic-bezier(0.1, 0.8, 0.3, 1) ${delay}s forwards`,
        '--target-x': `${x}px`,
        '--target-y': `${y}px`,
        opacity: 0,
      } as React.CSSProperties}
    >
      <Heart size={20} fill="currentColor" />
    </div>
  );
};

const ProposalModal: React.FC<ProposalModalProps> = ({ onAccepted }) => {
  const [accepted, setAccepted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: 'auto', left: 'auto' });

  const moveNo = () => {
    soundManager.playNoSound();
    const randomTop = Math.floor(Math.random() * 60) + 20;
    const randomLeft = Math.floor(Math.random() * 60) + 20;
    setNoPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  const handleYes = () => {
    soundManager.playRomanticSuccess();
    setAccepted(true);
    setShowCelebration(true);
    setTimeout(() => {
      onAccepted();
    }, 4000); 
  };

  if (accepted) {
    return (
      <div className="h-full w-full flex items-center justify-center p-4 bg-red-600 transition-all duration-700 overflow-hidden relative">
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {Array.from({ length: 40 }).map((_, i) => (
              <ConfettiPiece 
                key={i} 
                delay={Math.random() * 0.2} 
                angle={(i / 40) * Math.PI * 2} 
                distance={Math.random() * 400 + 200}
              />
            ))}
          </div>
        )}

        <div className="bg-white p-10 md:p-16 rounded-[4rem] text-center shadow-2xl max-w-2xl transform animate-scale-up relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-center gap-4 mb-8">
               <PartyPopper className="text-yellow-400 animate-bounce" size={40} />
               <div className="text-8xl drop-shadow-xl animate-bounce-slow">💍</div>
               <PartyPopper className="text-yellow-400 animate-bounce" size={40} />
            </div>
            
            <h3 className="text-4xl md:text-7xl font-romantic text-red-600 mb-6 drop-shadow-sm leading-tight">
               She Said Yes!
            </h3>
            
            <p className="text-2xl md:text-4xl font-hindi-title text-gray-800 mb-8 leading-tight">
              मेरी पूरी दुनिया अब तुम हो... <br/>
              <span className="text-red-500 mt-4 block scale-110 animate-pulse">हमेशा के लिए। ❤️</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="h-full w-full px-4 text-center bg-white relative overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-50 via-white to-white opacity-60"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-block p-5 bg-gradient-to-br from-red-50 to-white rounded-full shadow-lg mb-8 animate-floating border border-red-100">
            <Sparkles className="text-red-500" size={40} />
        </div>
        
        <h2 className="text-5xl md:text-8xl font-romantic text-red-600 mb-8 drop-shadow-sm leading-none">
          Mera Aakhri Sawaal...
        </h2>
        
        <p className="text-2xl md:text-4xl font-hindi-title text-red-900 mb-16 leading-relaxed max-w-3xl mx-auto px-4">
          "इन ७ वचनों की कसम खाकर पूछता हूँ...<br/>
          क्या तुम अपनी पूरी जिंदगी मेरे नाम करोगी?"
        </p>
        
        <div className="flex flex-wrap gap-8 justify-center items-center min-h-[300px] relative">
          <button 
            onMouseEnter={() => soundManager.playHover()}
            onClick={handleYes}
            className="group bg-gradient-to-r from-red-500 via-rose-500 to-red-600 text-white text-3xl md:text-5xl font-bold px-20 py-8 rounded-full shadow-xl transform transition-all z-20 active:scale-95 flex items-center gap-4"
          >
            हाँ! (YES)
            <Heart className="animate-pulse fill-current" size={32} />
          </button>
          
          <button 
            onMouseEnter={moveNo}
            onClick={moveNo}
            style={{ 
                position: noPosition.top === 'auto' ? 'static' : 'absolute',
                top: noPosition.top,
                left: noPosition.left,
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            className="bg-white border border-red-100 text-red-200 text-xl px-10 py-5 rounded-full shadow-md z-10 opacity-60 transition-all hover:text-red-400"
          >
            नहीं (NO)
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-up {
          animation: scale-up 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes confetti-burst {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0); }
          100% { opacity: 0; transform: translate(calc(-50% + var(--target-x)), calc(-50% + var(--target-y))) scale(1.5) rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ProposalModal;
