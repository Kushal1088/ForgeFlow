import React from 'react';
import { Activity, CheckCircle2, AlertCircle, X, Server, Database, Shield, Radio } from 'lucide-react';

export const SystemStatusModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const services = [
    { name: 'Core REST API Engine', status: 'Operational', latency: '14ms', icon: Server },
    { name: 'Workflow Execution Pipeline', status: 'Operational', latency: '22ms', icon: Activity },
    { name: 'Supabase Realtime WebSockets', status: 'Operational', latency: '8ms', icon: Radio },
    { name: 'PostgreSQL Storage Engine', status: 'Operational', latency: '4ms', icon: Database },
    { name: 'JWT Auth & Security Guard', status: 'Operational', latency: '10ms', icon: Shield },
  ];

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#1e1f26] border border-[#464554] rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative select-none">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#908fa0] hover:text-white">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-heading font-bold text-white">All Systems Operational</h3>
            <p className="text-xs font-mono text-[#908fa0]">ForgeFlow Global Cloud Infrastructure</p>
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-[#12131a] border border-[#464554]/40 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#282a31] text-[#c0c1ff] flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-white">{s.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#908fa0]">{s.latency}</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {s.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-[#464554]/30 flex items-center justify-between text-[11px] text-[#908fa0] font-mono">
          <span>Incident History: 0 incidents in last 90 days</span>
          <span className="text-[#6366f1]">99.99% Uptime</span>
        </div>
      </div>
    </div>
  );
};
