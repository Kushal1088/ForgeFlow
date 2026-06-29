import React from 'react';
import { Activity, Database, Server, Radio, Shield, CheckCircle2 } from 'lucide-react';

export const PlatformMonitoringPage = () => {
  return (
    <div className="space-y-6 animate-fadeIn select-none">
      <div className="pb-6 border-b border-[#464554]/40">
        <h1 className="text-2xl font-heading font-bold text-white tracking-tight">Platform Infrastructure Monitoring</h1>
        <p className="text-sm text-[#908fa0] mt-1">Real-time health status of MongoDB Database, Express API Workers, and Supabase WebSockets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#12131a] border border-emerald-500/40 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" /> MongoDB Atlas Database Status
            </h3>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
              Connected
            </span>
          </div>
          <p className="text-xs text-[#908fa0]">URI: mongodb+srv://.../forgeflow?retryWrites=true&w=majority</p>
          <p className="text-xs font-mono text-white">Connections: 4 Active Pools • Storage Used: 14.2 MB</p>
        </div>

        <div className="bg-[#12131a] border border-emerald-500/40 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" /> Express Node.js Engine
            </h3>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
              Operational
            </span>
          </div>
          <p className="text-xs text-[#908fa0]">Runtime: Node.js v20.x • Host: localhost:5000</p>
          <p className="text-xs font-mono text-white">CPU Usage: 1.2% • Memory Footprint: 84 MB</p>
        </div>
      </div>
    </div>
  );
};
