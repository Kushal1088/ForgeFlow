import React, { useEffect, useState } from 'react';
import { ShieldCheck, User, Shield, Search } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/audit-logs`)
      .then(res => res.json())
      .then(data => { setLogs(data.logs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-6 animate-fadeIn select-none">
      <div className="pb-6 border-b border-[#464554]/40">
        <h1 className="text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
          Organization Audit & Security Logs
        </h1>
        <p className="text-sm text-[#908fa0] mt-1">Immutable security trail tracking workflow publishing, execution triggers, and member permissions.</p>
      </div>

      <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#12131a] border-b border-[#464554]/40 text-[10px] font-mono uppercase text-[#908fa0]">
              <th className="py-3 px-6">Actor</th>
              <th className="py-3 px-6">Action Executed</th>
              <th className="py-3 px-6">Resource ID</th>
              <th className="py-3 px-6">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#464554]/30 text-xs">
            {loading ? (
              <tr><td colSpan="4" className="p-6 text-center text-[#908fa0]">Loading security logs...</td></tr>
            ) : logs.map((log) => (
              <tr key={log.id} className="hover:bg-[#282a31]/50 transition-colors">
                <td className="py-3.5 px-6 font-semibold text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center">
                    <User className="w-3 h-3" />
                  </div>
                  {log.actor}
                </td>
                <td className="py-3.5 px-6">
                  <span className="bg-[#6366f1]/10 text-[#c0c1ff] border border-[#6366f1]/30 px-2.5 py-1 rounded font-mono text-[10px]">
                    {log.action}
                  </span>
                </td>
                <td className="py-3.5 px-6 font-mono text-[#908fa0]">{log.resource}</td>
                <td className="py-3.5 px-6 font-mono text-[#908fa0]">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
