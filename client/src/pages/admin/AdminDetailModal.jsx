import React from 'react';
import { X, Server, Database, Activity, ShieldCheck, Cpu } from 'lucide-react';

export const AdminDetailModal = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn select-none">
      <div className="bg-[#1e1f26] border border-[#6366f1]/50 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-glow relative">
        <div className="flex items-center justify-between border-b border-[#464554]/40 pb-3">
          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#6366f1]" /> {title || "Telemetry Detailed Metrics"}
          </h3>
          <button onClick={onClose} className="text-[#908fa0] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 py-2">
          {data ? (
            <pre className="bg-[#12131a] p-4 rounded-xl text-xs font-mono text-[#c0c1ff] border border-[#464554]/40 overflow-x-auto max-h-64">
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30 flex items-center justify-between">
                <span className="text-[#908fa0]">MongoDB Cluster Engine</span>
                <span className="text-emerald-400 font-mono">Primary Replica Set (v7.0.5)</span>
              </div>
              <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30 flex items-center justify-between">
                <span className="text-[#908fa0]">Active Connection Pools</span>
                <span className="text-white font-mono">4 Connected Worker Pools</span>
              </div>
              <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30 flex items-center justify-between">
                <span className="text-[#908fa0]">Server Memory Heap</span>
                <span className="text-white font-mono">84.2 MB / 512 MB (16.4%)</span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-glow"
          >
            Close Telemetry Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
