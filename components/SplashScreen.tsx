
import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(onFinish, 1000);
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#006837] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center space-y-10">
        <div className="space-y-2 animate-pulse">
           <h1 className="text-7xl md:text-9xl font-serif font-black text-white tracking-tighter leading-none">MM&GG</h1>
           <div className="h-1 bg-[#D4AF37] mx-auto rounded-full w-24"></div>
        </div>
        
        <div className="space-y-4">
           <p className="text-[#D4AF37] text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] animate-slide-up">
             Establishing Global Presence
           </p>
           <div className="flex justify-center gap-1">
              {[0, 1, 2].map(i => (
                <div 
                  key={i} 
                  className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
           </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 text-white/20 text-[8px] font-black uppercase tracking-widest">
        Verifying Secure Connection...
      </div>
    </div>
  );
};

export default SplashScreen;
