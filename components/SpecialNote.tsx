
import React, { useState, useEffect } from 'react';
import { generateLoveNote } from '../services/geminiService.ts';
import { Loader2, MailOpen, Sparkles, Heart, RotateCcw } from 'lucide-react';

interface SpecialNoteProps {
  onRestart: () => void;
}

const SpecialNote: React.FC<SpecialNoteProps> = ({ onRestart }) => {
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      const result = await generateLoveNote('poetic');
      setNote(result || '');
      setLoading(false);
    };
    fetchNote();
  }, []);

  return (
    <section className="h-full w-full px-4 flex items-center justify-center bg-gradient-to-b from-white to-red-50">
      <div className="max-w-4xl w-full glass-morphism p-8 md:p-14 rounded-[3rem] shadow-xl border border-white text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 p-4 opacity-5">
            <Heart size={200} className="text-red-500 fill-current" />
        </div>
        
        <div className="relative z-10">
          <div className="inline-block p-4 bg-white rounded-full shadow-md mb-6">
            <MailOpen className="text-red-500" size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-hindi-title text-red-900 mb-2">मेरी जान के नाम एक पैगाम</h2>
          <div className="h-1 w-24 bg-red-400 mx-auto mb-8 rounded-full"></div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-red-500 mb-4" size={40} />
              <p className="text-red-400 text-lg italic">प्यार भरे शब्द पिरोए जा रहे हैं...</p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="bg-white/60 p-6 md:p-10 rounded-[2rem] border border-white shadow-inner backdrop-blur-sm">
                <p className="text-xl md:text-2xl text-gray-800 italic leading-relaxed whitespace-pre-wrap font-hindi-title text-left relative">
                  {note}
                </p>
                <div className="mt-10 text-right space-y-1 border-t border-red-50 pt-6">
                  <p className="font-romantic text-3xl text-red-600">Forever Yours,</p>
                  <p className="text-2xl md:text-3xl font-hindi-title text-red-900 font-bold">Er. Sangam Krishna</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
            <button 
              onClick={() => {
                setLoading(true);
                generateLoveNote('romantic').then(res => {
                  setNote(res);
                  setLoading(false);
                });
              }}
              className="group text-red-500 font-bold flex items-center gap-2 transition-all hover:scale-105 bg-white px-6 py-2 rounded-full shadow-sm border border-red-50"
            >
              <Sparkles size={18} />
              एक और खत पढ़ें
            </button>
            <button 
              onClick={onRestart}
              className="group text-gray-400 font-bold flex items-center gap-2 transition-all hover:scale-105 bg-white/50 px-6 py-2 rounded-full shadow-sm border border-gray-100"
            >
              <RotateCcw size={18} />
              सफर फिर शुरू करें
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialNote;
