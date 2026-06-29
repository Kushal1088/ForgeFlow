import React from 'react';
import { Globe, Code2, Terminal, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#1e1f26]/60 border-t border-[#464554]/30 px-6 py-4 text-xs text-[#908fa0] flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] bg-[#12131a] px-2 py-0.5 rounded border border-[#464554]/40 text-[#c0c1ff]">
          ForgeFlow v1.0.0
        </span>
        <span className="hidden sm:inline text-[#464554]">|</span>
        <span>
          Designed & Developed by <strong className="text-white font-semibold">Kushal Pandey</strong>
        </span>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/app/about" className="hover:text-[#6366f1] transition-colors flex items-center gap-1">
          <Code2 className="w-3.5 h-3.5" /> About System
        </Link>
        
        <div className="flex items-center gap-3">
          <a 
            href="https://github.com/Kushal1088" 
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub Portfolio"
            className="hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
          >
            <Terminal className="w-3.5 h-3.5 text-[#6366f1]" /> GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/pandeykushal1/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
          >
            <Share2 className="w-3.5 h-3.5 text-[#6366f1]" /> LinkedIn
          </a>
          <a 
            href="https://kushalportfolio.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Developer Portfolio"
            className="hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
          >
            <Globe className="w-3.5 h-3.5 text-[#6366f1]" /> Portfolio
          </a>
        </div>

        <span className="text-[10px] font-mono text-[#908fa0]">
          © 2026 Kushal Pandey. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
