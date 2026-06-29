import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export const SplashScreen = ({ onFinish }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 1800);
    const finishTimer = setTimeout(() => onFinish(), 2200);
    return () => { clearTimeout(timer); clearTimeout(finishTimer); };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 bg-[#12131a] z-50 flex flex-col items-center justify-center transition-opacity duration-500 select-none ${
      fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow mx-auto mb-4">
          <Zap className="w-9 h-9 text-white fill-current" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-white tracking-tight">ForgeFlow</h1>
        <p className="text-xs font-mono text-[#908fa0] uppercase tracking-widest">Enterprise Workflow Automation Platform</p>

        <div className="pt-8 space-y-1 border-t border-[#464554]/30 max-w-xs mx-auto">
          <p className="text-[11px] text-[#908fa0]">Designed & Developed by</p>
          <p className="text-sm font-heading font-bold text-white tracking-wide">Kushal Pandey</p>
        </div>
      </div>
    </div>
  );
};
