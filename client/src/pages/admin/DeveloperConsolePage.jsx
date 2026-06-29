import React from 'react';
import { Terminal, Code2, Cpu } from 'lucide-react';

export const DeveloperConsolePage = () => {
  return (
    <div className="space-y-6 animate-fadeIn select-none">
      <div className="pb-6 border-b border-[#464554]/40">
        <h1 className="text-2xl font-heading font-bold text-white tracking-tight">Developer Console & API Explorer</h1>
        <p className="text-sm text-[#908fa0] mt-1">Platform diagnostic terminal for Platform Owner Kushal Pandey.</p>
      </div>

      <div className="bg-[#12131a] border border-[#464554]/40 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#6366f1]" /> Environment Variables Inspector
        </h3>
        <pre className="bg-[#090a0f] p-4 rounded-xl text-xs font-mono text-[#c0c1ff] border border-[#464554]/40 overflow-x-auto">
{`NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://kushal:*****@cluster0.3joo9jr.mongodb.net/forgeflow
SUPABASE_URL=https://placeholder.supabase.co
SUPER_ADMIN_OWNER=Kushal Pandey`}
        </pre>
      </div>
    </div>
  );
};
