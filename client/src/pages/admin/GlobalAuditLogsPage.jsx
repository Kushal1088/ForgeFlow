import React from 'react';
import { ShieldCheck, User } from 'lucide-react';

export const GlobalAuditLogsPage = () => {
  const logs = [
    { id: 'g_1', actor: 'Kushal Pandey (Super Admin)', action: 'PLATFORM_BOOTSTRAP', tenant: 'Global', time: 'Just now' },
    { id: 'g_2', actor: 'Alex Mercer (Owner)', action: 'EXECUTED_WORKFLOW', tenant: 'Acme Global Corp', time: '1h ago' },
    { id: 'g_3', actor: 'Elena Rostova (Admin)', action: 'INVITED_MEMBER', tenant: 'Acme Global Corp', time: '3h ago' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      <div className="pb-6 border-b border-[#464554]/40">
        <h1 className="text-2xl font-heading font-bold text-white tracking-tight">Global Platform Audit Logs</h1>
        <p className="text-sm text-[#908fa0] mt-1">Cross-tenant security audit trail for Super Admin Kushal Pandey.</p>
      </div>

      <div className="bg-[#12131a] border border-[#464554]/40 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#464554]/40 text-[10px] font-mono uppercase text-[#908fa0]">
              <th className="py-3 px-6">Actor</th>
              <th className="py-3 px-6">Global Action</th>
              <th className="py-3 px-6">Tenant Scope</th>
              <th className="py-3 px-6">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#464554]/30 text-xs">
            {logs.map(l => (
              <tr key={l.id} className="hover:bg-[#1e1f26]/50">
                <td className="py-4 px-6 font-semibold text-white flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#6366f1]" /> {l.actor}
                </td>
                <td className="py-4 px-6 font-mono text-[#c0c1ff]">{l.action}</td>
                <td className="py-4 px-6 text-white">{l.tenant}</td>
                <td className="py-4 px-6 font-mono text-[#908fa0]">{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
