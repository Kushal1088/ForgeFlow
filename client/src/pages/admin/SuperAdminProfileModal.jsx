import React from 'react';
import { X, ShieldCheck, User, Mail, Database, Terminal, Cpu, CheckCircle2, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SuperAdminProfileModal = ({ isOpen, onClose }) => {
  const { superAdminUser } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn select-none">
      <div className="bg-[#1e1f26] border border-[#6366f1]/60 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-glow relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#6366f1]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#464554]/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                {superAdminUser.name}
              </h3>
              <span className="text-[10px] font-mono text-[#6366f1] bg-[#6366f1]/20 border border-[#6366f1]/40 px-2 py-0.5 rounded">
                {superAdminUser.title}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-[#908fa0] hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Detailed Admin Credentials & System Specifications */}
        <div className="space-y-4 text-xs">
          <div className="bg-[#12131a] border border-[#464554]/40 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#908fa0] flex items-center gap-2 font-mono">
                <Mail className="w-3.5 h-3.5 text-[#6366f1]" /> Primary Admin Email
              </span>
              <span className="text-white font-mono font-semibold">{superAdminUser.email}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#464554]/30 pt-2">
              <span className="text-[#908fa0] flex items-center gap-2 font-mono">
                <Award className="w-3.5 h-3.5 text-[#6366f1]" /> Platform Developer
              </span>
              <span className="text-white font-semibold">Kushal Pandey</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#464554]/30 pt-2">
              <span className="text-[#908fa0] flex items-center gap-2 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Security Scope
              </span>
              <span className="text-emerald-400 font-mono font-bold">Root / Global Super Admin</span>
            </div>
          </div>

          {/* Infrastructure Metrics */}
          <div className="bg-[#12131a] border border-[#464554]/40 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-[#6366f1]" /> Runtime Infrastructure State
            </h4>
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              <div className="bg-[#1e1f26] p-2.5 rounded-lg border border-[#464554]/30">
                <span className="text-[#908fa0] block text-[9px] uppercase">Node.js Engine</span>
                <span className="text-white font-semibold">v20.x ESM (Port 5000)</span>
              </div>
              <div className="bg-[#1e1f26] p-2.5 rounded-lg border border-[#464554]/30">
                <span className="text-[#908fa0] block text-[9px] uppercase">MongoDB Atlas</span>
                <span className="text-emerald-400 font-semibold">Connected (forgeflow)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-glow transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
