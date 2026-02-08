
import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { setFade(true); setTimeout(onFinish, 800); }, 2500);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#006837] flex flex-col items-center justify-center transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center space-y-6 animate-pulse">
        <h1 className="text-6xl font-serif font-black text-white tracking-tighter">MM&GG</h1>
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-[#D4AF37] animate-loading"></div>
        </div>
        <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">Establishing Global Presence</p>
      </div>
      <style>{`
        @keyframes loading { 0% { width: 0%; } 100% { width: 100%; } }
        .animate-loading { animation: loading 2s ease-in-out forwards; }
      `}</style>
    </div>
  );
};

export default SplashScreen;
