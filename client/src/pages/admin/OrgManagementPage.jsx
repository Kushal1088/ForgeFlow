import React, { useState } from 'react';
import { Building2, Plus, AlertTriangle, CheckCircle2, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const OrgManagementPage = () => {
  const { organizations, setOrganizations } = useAuth();
  const [newOrgName, setNewOrgName] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newOrgName) return;
    const newOrg = {
      id: `org_${Date.now()}`,
      name: newOrgName,
      slug: newOrgName.toLowerCase().replace(/\s+/g, '-'),
      tier: 'Enterprise Scale',
      status: 'Active',
      users: 1,
      workflows: 0
    };
    setOrganizations([...organizations, newOrg]);
    setNewOrgName('');
  };

  const toggleStatus = (id) => {
    setOrganizations(organizations.map(o => o.id === id ? { ...o, status: o.status === 'Active' ? 'Suspended' : 'Active' } : o));
  };

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      <div className="pb-6 border-b border-[#464554]/40 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">Organization Management</h1>
          <p className="text-sm text-[#908fa0] mt-1">Provision, suspend, or manage SaaS tenants across the ForgeFlow platform.</p>
        </div>
      </div>

      <div className="bg-[#12131a] border border-[#464554]/40 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Provision New Organization Tenant</h3>
        <form onSubmit={handleCreate} className="flex gap-3">
          <input
            type="text"
            placeholder="Organization Name (e.g., Nexus Labs)"
            value={newOrgName}
            onChange={(e) => setNewOrgName(e.target.value)}
            className="flex-1 bg-[#1e1f26] border border-[#464554]/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6366f1]"
          />
          <button type="submit" className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-glow">
            Provision Tenant
          </button>
        </form>
      </div>

      <div className="bg-[#12131a] border border-[#464554]/40 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#464554]/40 text-[10px] font-mono uppercase text-[#908fa0]">
              <th className="py-3 px-6">Tenant Name</th>
              <th className="py-3 px-6">Slug ID</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#464554]/30 text-xs">
            {organizations.map(org => (
              <tr key={org.id} className="hover:bg-[#1e1f26]/50">
                <td className="py-4 px-6 font-semibold text-white">{org.name}</td>
                <td className="py-4 px-6 font-mono text-[#908fa0]">{org.slug}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono ${org.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                    {org.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button onClick={() => toggleStatus(org.id)} className="text-xs font-mono text-[#6366f1] hover:underline">
                    {org.status === 'Active' ? 'Suspend Tenant' : 'Activate Tenant'}
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
