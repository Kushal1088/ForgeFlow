import React, { useState } from 'react';
import { Users2, ShieldCheck, Search, Lock } from 'lucide-react';

export const UserManagementPage = () => {
  const [users] = useState([
    { id: 'usr_1', name: 'Alex Mercer', email: 'admin@forgeflow.io', org: 'Acme Global Corp', role: 'owner', status: 'Active' },
    { id: 'usr_2', name: 'Elena Rostova', email: 'elena@acmeglobal.com', org: 'Acme Global Corp', role: 'admin', status: 'Active' },
    { id: 'usr_3', name: 'Marcus Vance', email: 'marcus@acmeglobal.com', org: 'Acme Global Corp', role: 'builder', status: 'Active' },
    { id: 'usr_4', name: 'DevOps Lead', email: 'lead@devops.io', org: 'DevOps Platform Team', role: 'owner', status: 'Active' }
  ]);

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      <div className="pb-6 border-b border-[#464554]/40">
        <h1 className="text-2xl font-heading font-bold text-white tracking-tight">Platform User Directory</h1>
        <p className="text-sm text-[#908fa0] mt-1">Audit all platform users across organizations and reset authentication credentials.</p>
      </div>

      <div className="bg-[#12131a] border border-[#464554]/40 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#464554]/40 text-[10px] font-mono uppercase text-[#908fa0]">
              <th className="py-3 px-6">User</th>
              <th className="py-3 px-6">Organization Tenant</th>
              <th className="py-3 px-6">Tenant Role</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#464554]/30 text-xs">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-[#1e1f26]/50">
                <td className="py-4 px-6 font-semibold text-white">
                  <p>{u.name}</p>
                  <p className="text-[11px] font-mono text-[#908fa0] font-normal">{u.email}</p>
                </td>
                <td className="py-4 px-6 text-white">{u.org}</td>
                <td className="py-4 px-6">
                  <span className="bg-[#6366f1]/10 text-[#c0c1ff] border border-[#6366f1]/30 px-2 py-0.5 rounded text-[10px] font-mono uppercase">
                    {u.role}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button onClick={() => alert(`Reset link dispatched for ${u.email}`)} className="text-xs font-mono text-[#6366f1] hover:underline flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
