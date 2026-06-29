import React, { useEffect } from 'react';
import { Code2, ShieldCheck, Cpu, X, Globe, Terminal, Share2 } from 'lucide-react';

export const DeveloperModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) onClose(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn select-none">
      <div className="bg-[#1e1f26] border border-[#6366f1]/50 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-glow relative">
        <button onClick={() => onClose(false)} className="absolute top-4 right-4 text-[#908fa0] hover:text-white">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 border-b border-[#464554]/40 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-heading font-bold text-white">Developer Diagnostics & Specifications</h3>
            <p className="text-xs font-mono text-[#908fa0]">Hidden Developer System Information (Ctrl+Shift+D)</p>
          </div>
        </div>

        {/* Developer Info Profile Card */}
        <div className="bg-[#12131a] border border-[#464554]/40 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#6366f1]">Principal Engineer</span>
            <h4 className="text-base font-heading font-bold text-white mt-0.5">Kushal Pandey</h4>
            <p className="text-xs text-[#908fa0]">Full Stack MERN & SaaS Engineer</p>
          </div>
          <div className="flex items-center gap-3 text-[#908fa0]">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white" title="GitHub"><Terminal className="w-4 h-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white" title="LinkedIn"><Share2 className="w-4 h-4" /></a>
            <a href="https://kushalpandey.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white" title="Portfolio"><Globe className="w-4 h-4" /></a>
          </div>
        </div>

        {/* System & Architecture Specs */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
            <span className="text-[10px] text-[#908fa0] block">App Version</span>
            <span className="text-white font-bold">v1.0.0 Enterprise</span>
          </div>
          <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
            <span className="text-[10px] text-[#908fa0] block">Build Environment</span>
            <span className="text-emerald-400 font-bold">Production Ready</span>
          </div>
          <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
            <span className="text-[10px] text-[#908fa0] block">Frontend Framework</span>
            <span className="text-white">React 18.3 + Vite</span>
          </div>
          <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
            <span className="text-[10px] text-[#908fa0] block">Backend Runtime</span>
            <span className="text-white">Node.js Express ES6</span>
          </div>
        </div>
      </div>
    </div>
  );
};
