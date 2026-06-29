import React from 'react';
import { Zap, Code2, ShieldCheck, Globe, Cpu, Terminal, Layers, Share2 } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-fadeIn select-none overflow-x-hidden">
      {/* Header Banner */}
      <div className="pb-6 border-b border-[#464554]/40 flex items-center gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow flex-shrink-0">
          <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-2 flex-wrap">
            About ForgeFlow Platform
            <span className="text-xs font-mono bg-[#6366f1]/20 text-[#c0c1ff] px-2 py-0.5 rounded border border-[#6366f1]/30">
              v1.0.0
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#908fa0] mt-0.5">Enterprise Workflow Automation & Business Operating Engine.</p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-5 sm:p-6 space-y-4">
        <h2 className="text-sm sm:text-base font-heading font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#6366f1]" /> Project Overview & Purpose
        </h2>
        <p className="text-xs text-[#908fa0] leading-relaxed">
          ForgeFlow was engineered to solve complex business automation challenges by replacing fragile CRUD scripts with visual, event-driven workflow execution graphs. Built with modern dark-mode aesthetic standards (Obsidian Flow), it empowers operators to create, run, and audit high-throughput business logic seamlessly.
        </p>
      </div>

      {/* Developer Section */}
      <div className="bg-[#1e1f26] border border-[#6366f1]/50 rounded-2xl p-5 sm:p-6 space-y-6 shadow-glow relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#464554]/40 pb-4 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#6366f1] tracking-wider">Designed & Developed By</span>
            <h2 className="text-lg sm:text-xl font-heading font-bold text-white mt-0.5">Kushal Pandey</h2>
            <p className="text-xs text-[#908fa0]">Full Stack MERN & SaaS Software Engineer</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <a href="https://github.com/Kushal1088" target="_blank" rel="noopener noreferrer" className="bg-[#12131a] hover:bg-[#282a31] border border-[#464554] p-2 sm:p-2.5 rounded-xl text-white transition-colors flex items-center gap-1.5 font-mono text-xs" title="GitHub">
              <Terminal className="w-4 h-4 text-[#6366f1]" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/pandeykushal1/" target="_blank" rel="noopener noreferrer" className="bg-[#12131a] hover:bg-[#282a31] border border-[#464554] p-2 sm:p-2.5 rounded-xl text-white transition-colors flex items-center gap-1.5 font-mono text-xs" title="LinkedIn">
              <Share2 className="w-4 h-4 text-[#6366f1]" /> LinkedIn
            </a>
            <a href="https://kushalportfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-[#6366f1] hover:bg-[#8083ff] p-2 sm:p-2.5 rounded-xl text-white shadow-glow transition-all flex items-center gap-1.5 font-mono text-xs" title="Portfolio">
              <Globe className="w-4 h-4" /> Portfolio
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs">
          <div className="bg-[#12131a] p-3.5 sm:p-4 rounded-xl border border-[#464554]/30 space-y-1">
            <span className="text-[10px] font-mono text-[#908fa0]">Engineering Role</span>
            <p className="text-white font-bold">Full Stack MERN Architect</p>
          </div>
          <div className="bg-[#12131a] p-3.5 sm:p-4 rounded-xl border border-[#464554]/30 space-y-1">
            <span className="text-[10px] font-mono text-[#908fa0]">Architecture</span>
            <p className="text-emerald-400 font-bold">Clean & Modular SaaS</p>
          </div>
          <div className="bg-[#12131a] p-3.5 sm:p-4 rounded-xl border border-[#464554]/30 space-y-1">
            <span className="text-[10px] font-mono text-[#908fa0]">License</span>
            <p className="text-white font-bold">MIT License (© 2026)</p>
          </div>
        </div>
      </div>

      {/* Tech Stack Specs */}
      <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-5 sm:p-6 space-y-4">
        <h2 className="text-sm sm:text-base font-heading font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#6366f1]" /> Technology Stack & Specifications
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs font-mono">
          <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
            <span className="text-[10px] text-[#908fa0] block">Frontend</span>
            <span className="text-white">React 18 + Vite</span>
          </div>
          <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
            <span className="text-[10px] text-[#908fa0] block">Backend API</span>
            <span className="text-white">Node.js Express</span>
          </div>
          <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
            <span className="text-[10px] text-[#908fa0] block">Database Engine</span>
            <span className="text-white">MongoDB Atlas</span>
          </div>
          <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
            <span className="text-[10px] text-[#908fa0] block">Styling System</span>
            <span className="text-white">Tailwind CSS v4</span>
          </div>
        </div>
      </div>
    </div>
  );
};
